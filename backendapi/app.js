import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import "dotenv/config";

// ✅ Import Routers
import UserRouter from "./route/user.route.js";
import TaskRouter from "./route/TaskRouter.js";
import authRoutes from "./route/auth.js";          // Google Auth Routes
import configurePassport from "./config/passport.js";  // Google Passport Config

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB Atlas Connected Successfully"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

// ✅ Google Auth Passport Configuration
configurePassport(passport);

// ✅ Middleware Setup
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Session Middleware with MongoStore
app.use(
    session({
        secret: process.env.SESSION_SECRET || "ThisIsASecretKey",
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/user", UserRouter);
app.use("/user/:userId/task", TaskRouter);
app.use("/", authRoutes);   // Google Auth route

// ✅ Socket.IO and Server Start
const server = app.listen(PORT, () => {
    console.log(`🚀 Server Running on http://localhost:${PORT}`);
});

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// ✅ Room Management
const activeRooms = new Map(); // roomID -> Set of socketIDs

io.on("connection", (socket) => {
    console.log(`New Connection: ${socket.id}`);

    // ✅ Room Join
    socket.on("room:join", ({ room }) => {
        if (!activeRooms.has(room)) {
            activeRooms.set(room, new Set());
        }
        activeRooms.get(room).add(socket.id);

        socket.join(room);
        
        socket.to(room).emit("user:joined", { id: socket.id });

        // Send confirmation to joiner
        socket.emit("room:joined", { room });
    });

    // ✅ Call and ICE Candidate Handling
    socket.on("user:call", ({ to, offer }) => {
        socket.to(to).emit("incoming:call", { from: socket.id, offer });
    });

    socket.on("call:accepted", ({ to, answer }) => {
        socket.to(to).emit("call:accepted", { from: socket.id, answer });
    });

    socket.on("ice:candidate", ({ to, candidate }) => {
        socket.to(to).emit("ice:candidate", { from: socket.id, candidate });
    });

    // ✅ Disconnect Handler
    socket.on("disconnect", () => {
        console.log(`Disconnected: ${socket.id}`);

        // Cleanup from all rooms
        activeRooms.forEach((users, room) => {
            if (users.has(socket.id)) {
                users.delete(socket.id);

                // Notify room members
                socket.to(room).emit("user:left", { id: socket.id });

                // Remove empty rooms
                if (users.size === 0) {
                    activeRooms.delete(room);
                }
            }
        });
    });
});

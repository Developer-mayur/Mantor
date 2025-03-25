import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import UserRouter from "./route/user.route.js";
import "dotenv/config";
import TaskRouter from "./route/TaskRouter.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

 
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB Atlas Connected Successfully");
 
    app.use("/user", UserRouter);
    app.use("/user/:userId/task", TaskRouter);

  
    const server = app.listen(PORT, () => {
      console.log(`Server Running on http://localhost:${PORT}`);
    });
 
    const io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    // Room Management
    const activeRooms = new Map(); // roomID -> Set of socketIDs

    io.on("connection", (socket) => {
      console.log(`New Connection: ${socket.id}`);
 


      socket.on("room:join", ({ room }) => {
        // Add to room tracking
        if (!activeRooms.has(room)) {
          activeRooms.set(room, new Set());
        }
        activeRooms.get(room).add(socket.id);

        socket.join(room);
        
       
        socket.to(room).emit("user:joined", { 
          id: socket.id 
        });

        // Send confirmation to joiner
        socket.emit("room:joined", { room });
      });

       socket.on("user:call", ({ to, offer }) => {
        socket.to(to).emit("incoming:call", { 
          from: socket.id, 
          offer 
        });
      });

      socket.on("call:accepted", ({ to, answer }) => {
        socket.to(to).emit("call:accepted", { 
          from: socket.id, 
          answer 
        });
      });

      socket.on("ice:candidate", ({ to, candidate }) => {
        socket.to(to).emit("ice:candidate", {
          from: socket.id,
          candidate
        });
      });

      // Disconnect Handler
      socket.on("disconnect", () => {
        console.log(`Disconnected: ${socket.id}`);
        
        // Cleanup from all rooms
        activeRooms.forEach((users, room) => {
          if(users.has(socket.id)) {
            users.delete(socket.id);
            
            // Notify room members
            socket.to(room).emit("user:left", { 
              id: socket.id 
            });

            // Remove empty rooms
            if(users.size === 0) {
              activeRooms.delete(room);
            }
          }
        });
      });
    });
  })
  .catch(err => {
    console.error("MongoDB Connection Error:", err);
  });
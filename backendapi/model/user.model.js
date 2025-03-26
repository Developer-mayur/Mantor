import mongoose from "mongoose";

// ✅ Google Auth Schema
const googleUserSchema = new mongoose.Schema({
    googleId: { type: String, required: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true }
});

export const GoogleUser = mongoose.model("GoogleUser", googleUserSchema);

// ✅ Regular User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: { type: Number },
    address: { type: String },
    tasks: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task'  
    }]
});

export const User = mongoose.model("User", userSchema);

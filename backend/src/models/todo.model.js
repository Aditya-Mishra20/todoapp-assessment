import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true
 },
  completed: { 
    type: Boolean, 
    default: false 
}, // checkbox
  boardId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Board", 
    required: true 
},
  owner: { 
    type: String, 
    required: true 
}, // firebaseUid
}, { timestamps: true });

export const Todo = mongoose.model("Todo", todoSchema);

import mongoose from 'mongoose'

const boardSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
},
  description: { 
    type: String 
},
  owner: { 
    type: String, 
    required: true
 }, // user ID from auth
}, 
{ timestamps: true });

export const Board =  mongoose.model("Board", boardSchema);

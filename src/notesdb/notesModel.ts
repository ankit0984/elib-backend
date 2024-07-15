import mongoose from "mongoose";
import { Note } from "./notesType";

const noteschema = new mongoose.Schema<Note>({
    title:{ type:String, required:true,},
    description:{ type:String, required:true },
    category:{ type:String, required:true },
    file:{ type:String, required:true },
}, { timestamps: true });

export default mongoose.model<Note>("Note", noteschema);
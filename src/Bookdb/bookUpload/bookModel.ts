import mongoose from "mongoose";
import { Book } from "./bookTypes";

const bookSchema = new mongoose.Schema<Book>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    authors: { type: String, required: true },
    category: { type: String, required: true },
    coverImage: { type: String, required: true },
    file: { type: String, required: true },

},
{ timestamps: true }
);


export default mongoose.model<Book>("Book", bookSchema);
import mongoose, { Schema } from "mongoose";
import { Genre } from "../interfaces/Genre";

const GenreSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<Genre>("Genre", GenreSchema);
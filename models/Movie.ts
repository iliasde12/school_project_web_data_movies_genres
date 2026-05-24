import mongoose, { Schema } from "mongoose";
import { Movie } from "../interfaces/Movie";

const MovieSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    year: { type: Number, required: true },
    rating: { type: Number, required: true },
    duration: { type: Number, required: true },
    director: { type: String, required: true },
    poster: { type: String, required: true },
    genre: { type: Schema.Types.ObjectId, ref: "Genre", required: true },
}, { timestamps: true });

export default mongoose.model<Movie>("Movie", MovieSchema);
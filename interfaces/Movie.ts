import { Document } from "mongoose";
import mongoose from "mongoose";

export interface Movie extends Document {
    title: string;
    description: string;
    year: number;
    rating: number;
    duration: number;
    director: string;
    poster: string;
    genre: mongoose.Types.ObjectId;
}
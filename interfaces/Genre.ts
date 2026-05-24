import { Document } from "mongoose";

export interface Genre extends Document {
    name: string;
    description: string;
    icon: string;
    color: string;
}
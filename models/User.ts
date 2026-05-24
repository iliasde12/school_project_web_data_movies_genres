import mongoose, { Schema } from "mongoose";
import { User } from "../interfaces/User";

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<User>("User", UserSchema);
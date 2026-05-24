import session, { MemoryStore } from "express-session";
import { SessionUser } from "../interfaces/SessionUser";
import MongoStore from 'connect-mongo'
import dotenv from "dotenv";
dotenv.config();

const mongoStore = MongoStore.create({
    mongoUrl: process.env.MONGO_URI || "mongodb://localhost:27017/mijndb",
    dbName: "sessions",
    collectionName: "login-express"
});

mongoStore.on("error", (error) => {
    console.error(error);
});

declare module 'express-session' {
    export interface SessionData {
        user?: SessionUser
    }
}

export default session({
    secret: process.env.SESSION_SECRET ?? "my-super-secret-secret",
    store: mongoStore,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    }
});
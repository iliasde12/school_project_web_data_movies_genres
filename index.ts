import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import mainRouter  from "./routes/mainRouter";
import adminRouter from "./routes/admin/adminRouter";
import cors from "cors";
import sessionConfig from "./config/session";
import { isAuthenticated } from "./middleware/authMiddleware";
dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("port", process.env.PORT || 3000);
//cors zodat er geen onbekende op mijn routes kan iets kan doen
app.use(cors({
    origin: "http://localhost:3000", // 👈 alleen jouw domein
    methods: ["GET"]
}));
//sessions
app.use(sessionConfig);
//alle routes voor de paginas
app.use("/", mainRouter);
//alle admin routes voor data aantepassen en dergelijke
app.use("/admin",isAuthenticated, adminRouter);
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mijndb";

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Verbonden met MongoDB");

        app.listen(app.get("port"), () => {
            console.log("Server started on http://localhost:" + app.get("port"));
        });
    })
    .catch((err) => {
        console.error("MongoDB verbindingsfout:", err);
        process.exit(1);
    });
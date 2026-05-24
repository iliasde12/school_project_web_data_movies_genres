import mongoose from "mongoose";
import dotenv from "dotenv";
import readlineSync from "readline-sync";
import bcrypt from "bcrypt";
import User from "../models/User";

dotenv.config();

const createAdmin = async () => {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/mijndb");

    const name = readlineSync.question("Naam: ");
    const email = readlineSync.question("Email: ");
    const password = readlineSync.question("Wachtwoord: ", { hideEchoBack: true });

    const existing = await User.findOne({ email });
    if (existing) {
        console.log("❌ Gebruiker bestaat al!");
        process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword });

    console.log("✅ Admin aangemaakt!");
    process.exit(0);
};

createAdmin().catch((err) => {
    console.error(err);
    process.exit(1);
});
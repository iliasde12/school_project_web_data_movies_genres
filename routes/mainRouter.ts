import express, { Router } from "express";
import bcrypt from "bcrypt";
import Movie from "../models/Movie";
import Genre from "../models/Genre";
import mongoose from "mongoose";
import User from "../models/User";

const mainRouter: Router = express.Router();

mainRouter.get("/", async (req, res) => {
    const movies = await Movie.find();
    const genres = await Genre.find();
    res.render("index", { movies, genres });
});

//movie page
mainRouter.get("/movies/:id", async (req, res) => {
    const movie = await Movie.findById(req.params.id).populate("genre");
    if (!movie) {
        res.status(404).render("404");
        return;
    }
    res.render("movie", { movie });
});

//data krijgen voor te update aan de hand van genre
mainRouter.get("/api/movies", async (req, res) => {
    const { genre } = req.query;
    const filter = genre ? { genre: new mongoose.Types.ObjectId(genre as string) } : {};
    const movies = await Movie.find(filter).populate("genre");
    res.json(movies);
});

mainRouter.get("/login", (req, res) => {
    res.render("login");
});

mainRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.render("login", { error: "Gebruiker niet gevonden" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.render("login", { error: "Verkeerd wachtwoord" });
            return;
        }

        req.session.user = {
            _id: user._id.toString(),
            name: user.name,
            email: user.email
        };

        res.redirect("/admin");
    } catch (err) {
        console.error(err);
        res.render("login", { error: "Er is iets misgegaan" });
    }
});

mainRouter.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});


export default mainRouter;
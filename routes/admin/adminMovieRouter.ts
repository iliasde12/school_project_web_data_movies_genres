import express, { Router } from "express";
import Movie from "../../models/Movie";
import Genre from "../../models/Genre";

const movieRouter: Router = express.Router();

movieRouter.get("/", async (req, res) => {
    const movies = await Movie.find().populate("genre");
    res.render("admin/movies/index", { movies });
});

movieRouter.get("/create", async (req, res) => {
    const genres = await Genre.find();
    res.render("admin/movies/create", { genres });
});

movieRouter.post("/create", async (req, res) => {
    const { title, description, year, rating, duration, director, poster, genre } = req.body;
    await Movie.create({ title, description, year, rating, duration, director, poster, genre });
    res.redirect("/admin/movies");
});

movieRouter.get("/:id/edit", async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    const genres = await Genre.find();
    if (!movie) { res.redirect("/admin/movies"); return; }
    res.render("admin/movies/edit", { movie, genres });
});

movieRouter.post("/:id/edit", async (req, res) => {
    const { title, description, year, rating, duration, director, poster, genre } = req.body;
    await Movie.findByIdAndUpdate(req.params.id, { title, description, year, rating, duration, director, poster, genre });
    res.redirect("/admin/movies");
});

movieRouter.post("/:id/delete", async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/admin/movies");
});

export default movieRouter;
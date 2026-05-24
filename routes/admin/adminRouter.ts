import express, { Router } from "express";
import movieRouter from "./adminMovieRouter";
import genreRouter from "./adminGenreRouter";
import Movie from "../../models/Movie";
import Genre from "../../models/Genre";

const adminRouter: Router = express.Router();

adminRouter.get("/", async (req, res) => {
    const movieCount = await Movie.countDocuments();
    const genreCount = await Genre.countDocuments();
    res.render("admin/dashboard", { movieCount, genreCount });
});

adminRouter.use("/movies", movieRouter);
adminRouter.use("/genres", genreRouter);

export default adminRouter;
import express, { Router } from "express";
import Genre from "../../models/Genre";

const genreRouter: Router = express.Router();

genreRouter.get("/", async (req, res) => {
    const genres = await Genre.find();
    res.render("admin/genres/index", { genres });
});

genreRouter.get("/create", (req, res) => {
    res.render("admin/genres/create");
});

genreRouter.post("/create", async (req, res) => {
    const { name, description, icon, color } = req.body;
    await Genre.create({ name, description, icon, color });
    res.redirect("/admin/genres");
});

genreRouter.get("/:id/edit", async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) { res.redirect("/admin/genres"); return; }
    res.render("admin/genres/edit", { genre });
});

genreRouter.post("/:id/edit", async (req, res) => {
    const { name, description, icon, color } = req.body;
    await Genre.findByIdAndUpdate(req.params.id, { name, description, icon, color });
    res.redirect("/admin/genres");
});

genreRouter.post("/:id/delete", async (req, res) => {
    await Genre.findByIdAndDelete(req.params.id);
    res.redirect("/admin/genres");
});

export default genreRouter;
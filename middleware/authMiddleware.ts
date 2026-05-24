import { Request, Response, NextFunction } from "express";
import "../config/session";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/login");
    }
};
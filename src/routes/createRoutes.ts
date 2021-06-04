import Router, { Express } from "express";
import passport from "passport";
import { failureUrl, successUrl } from "../constants";

const router = Router();

const createRoutes = (app: Express) => {
    router.get("/", (_, res) => res.json({ msg: "hello World!" }));
    router.get("/auth/github", passport.authenticate("github"));
    router.get("/getuser", (req, res) => res.json({ user: req.user }));
    router.get(
        "/auth/github/callback",
        passport.authenticate("github", { failureRedirect: failureUrl, session: true }),
        (_, res) => res.redirect(successUrl),
    );
    return app.use(router);
};

export default createRoutes;

import Router, { Express } from "express";
import passport from "passport";
import { failureUrl, successUrl } from "../constants";
import { facebookScopes } from "../services/auth/scopes";

const router = Router();

const createRoutes = (app: Express) => {
    router.get("/", (_, res) => res.json({ msg: "hello World!" }));

    router.get("/auth/github", passport.authenticate("github"));
    router.get(
        "/auth/github/callback",
        passport.authenticate("github", { failureRedirect: failureUrl, session: true }),
        (_, res) => res.redirect(successUrl),
    );

    router.get("/auth/facebook", passport.authenticate("facebook"));
    router.get(
        "/auth/facebook/callback",
        passport.authenticate(
            "facebook",
            { failureRedirect: failureUrl, session: true, scope: facebookScopes },
        ),
        (_, res) => res.redirect(successUrl),
    );

    router.get("/getuser", (req, res) => {
        if (req.user) {
            console.log(req.user);
            return res.status(200).json({ user: req.user });
        }
        return res.status(401).json({ msg: "Unauthenticated" });
    });

    return app.use(router);
};

export default createRoutes;

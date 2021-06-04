import express from "express";
import { config } from "dotenv";
import fs from "fs";
import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import passport from "passport";

import ConnectToDb from "./config/database";
import createRoutes from "./routes/createRoutes";
import GithubStrategy from "./controllers/auth/githubStartegy";
import { MyUser } from "./types";
import UserModel from "./models/User";

(async () => {
    config();
    await ConnectToDb();

    const app = express();

    app.use(helmet());
    app.use(cors({ origin: "http://localhost:3000", credentials: true }));
    app.use(express.json());
    app.use(morgan("dev"));

    app.use(
        session({
            name: "myCookie",
            secret: "secretcode",
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 5, // expires after 5 years
                httpOnly: true,
                sameSite: "lax", // protect against csrf
                secure: process.env.NODE_ENV === "production", // cookie only works in https if running in production
            },
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user: MyUser, done) => done(null, user._id));
    passport.deserializeUser((id: string, done) => UserModel.findById(id, (_: Error, doc: MyUser) => done(null, doc)));

    passport.use(GithubStrategy());

    if (process.env.NODE_ENV === "production") {
        const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });
        app.use(morgan("combined", { stream: accessLogStream }));
    }

    createRoutes(app);
    const port = process.env.PORT || 8080;

    app.listen(port, () => console.log(`Server is running on port ${port} ...`));
})().catch((e) => console.log(e));

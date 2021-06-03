import express from "express";
import { config } from "dotenv";
import fs from "fs";
import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import ConnectToDb from "./config/database";

(async () => {
    config();
    await ConnectToDb();

    const app = express();

    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(
        session({
            secret: "secretcode",
            resave: true,
            saveUninitialized: true,
            cookie: {
                sameSite: "none",
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
            },
        }),
    );

    if (process.env.NODE_ENV === "production") {
        const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });
        app.use(morgan("combined", { stream: accessLogStream }));
    }

    app.get("/", (_, res) => res.json({ msg: "hello World!" }));

    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server is running on port ${port} ...`));
})().catch((e) => console.log(e));

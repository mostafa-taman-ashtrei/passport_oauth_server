import express from "express";
import { config } from "dotenv";
import fs from "fs";
import path from "path";
import helmet from "helmet";
import morgan from "morgan";

(async () => {
    config();
    const app = express();

    app.use(helmet());
    app.use(express.json());
    app.use(morgan("dev"));

    if (process.env.NODE_ENV === "production") {
        const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });
        app.use(morgan("combined", { stream: accessLogStream }));
    }

    app.get("/", (_, res) => res.json({ msg: "hello World!" }));

    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Serer is running on port ${port} ...`));
})();

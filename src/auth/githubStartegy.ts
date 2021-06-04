import { Strategy as GithubStrategy } from "passport-github";
import UserModel from "../models/User";

const Strategy = () => new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackURL: "/auth/github/callback",
}, async (_, __, profile, cb) => {
    console.log(profile);
    const user = await UserModel.findOne({ githubId: profile.id });

    if (!user) {
        const newUser = new UserModel({
            githubId: profile.id,
            username: profile.username,
        });

        await newUser.save();
        cb(null, newUser);
        console.log("created User");
    } else {
        cb(null, user);
        console.log(user.username);
    }
});

export default Strategy;

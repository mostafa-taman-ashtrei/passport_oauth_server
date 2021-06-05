import { Strategy as FacebookStrategy } from "passport-facebook";
import UserModel from "../../models/User";

const Strategy = () => new FacebookStrategy({
    clientID: process.env.FACBOOK_APP_ID!,
    clientSecret: process.env.FACEBOOK_APP_SECRET!,
    callbackURL: "/auth/facebook/callback",
    profileFields: ["id", "displayName", "photos", "email", "name", "gender"],
    enableProof: true,
}, async (_, __, profile, cb) => {
    console.log(profile);
    const user = await UserModel.findOne({ facebookId: profile.id });

    if (!user) {
        const newUser = new UserModel({
            facebookId: profile.id,
            username: profile.displayName,
        });

        await newUser.save();
        console.log("created a new User");
        cb(null, newUser);
    } else {
        cb(null, user);
        console.log(user);
    }
});

export default Strategy;

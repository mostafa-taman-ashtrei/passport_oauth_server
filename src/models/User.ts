import { Schema, model, Model } from "mongoose";
import { MyUser } from "../types";

const userSchema = new Schema({
    githubId: {
        required: false,
        type: String,
    },
    facebookId: {
        required: false,
        type: String,
    },
    username: {
        required: true,
        type: String,
    },
});

const UserModel: Model<MyUser> = model("User", userSchema);
export default UserModel;

import { Document } from "mongoose";

export interface MyUser extends Document {
    githubId?: string;
    facebookId?: string;
    username: string;
}

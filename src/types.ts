import { Document } from "mongoose";

export interface MyUser extends Document {
    githubId: string;
    username: string;
}

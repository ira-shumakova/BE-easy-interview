import mongoose, { Schema } from "mongoose";

export interface IUser {
    username: string;
    email: string;
    password: string;
}

export interface IUser extends Document {};

const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IUser>('User', UserSchema);
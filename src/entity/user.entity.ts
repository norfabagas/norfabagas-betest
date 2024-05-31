import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: { type: String, required: true, unique: true },
    accountNumber: { type: String, required: true, unique: true },
    emailAddress: { type: String, required: true, unique: true },
    identityNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export const User = mongoose.model("User", UserSchema);

import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();

export async function connect() {
    await mongoose.connect(process.env.MONGO_URL || "")
}

import { configDotenv } from "dotenv";
import { createClient } from "redis";

configDotenv();

export async function connect() {
    const client = await createClient({
        url: process.env.REDIS_URL || ""
    })
        .on('error', err => console.error(`Redis client error ${err}`))
        .connect();

    return client;
}

export async function disconnect() {
    await (await connect()).disconnect();
}

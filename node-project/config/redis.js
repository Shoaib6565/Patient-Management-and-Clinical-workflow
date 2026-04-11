import { createClient } from "redis";

export const redis = createClient({
  url: process.env.REDIS_URL,
});
console.log("Connecting to Redis...");
redis.connect().catch(console.error);
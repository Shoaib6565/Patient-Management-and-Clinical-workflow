import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.js";
import { redis } from "../config/redis.js";

export const auth = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = header.split(" ")[1];

  try {
    const isBlacklisted = await redis.get(`bl:${token}`);
    if (isBlacklisted) {
      return res.status(401).json({ message: "Token has been blacklisted" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    req.token = token;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
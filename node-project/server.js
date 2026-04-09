import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./models/index.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();


const app = express();

app.use(express.json()); // ✅ REQUIRED
app.use(express.urlencoded({ extended: true })); // optional but good

// Routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("API Running 🚀"));

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    console.log("✅ Database synced successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error setting up database:", err);
    process.exit(1);
  });
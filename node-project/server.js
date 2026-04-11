import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./models/index.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use("/auth", authRoutes);



const PORT = process.env.PORT;

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
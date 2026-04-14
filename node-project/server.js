import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./models/index.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import patientsRoutes from "./routes/patients.route.js";
import caseRoutes from "./routes/case.route.js";


dotenv.config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/patients", patientsRoutes);
app.use("/cases", caseRoutes);

// for handle notification through socket.io
app.post("/send", (req, res) => {
  const { userId, data } = req.body;
  const socketId = users[userId];
  if (socketId) {
    io.to(socketId).emit("new_notification", data);
  }
  res.send({ success: true });
});




const PORT = process.env.PORT;

sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully");
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Error setting up database:", err);
    process.exit(1);
  });
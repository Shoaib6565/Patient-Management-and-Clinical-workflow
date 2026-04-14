import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Debug: check environment variables
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);

if (!process.env.DB_NAME || !process.env.DB_USER) {
  throw new Error(
    "Database environment variables missing! Check your .env file."
  );
}

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: false,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log(" MySQL connection successful!");
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    console.log(` Database "${process.env.DB_NAME}" ensured.`);
  } catch (error) {
    console.error(" Unable to connect to the database:", error);
  }
})();

export default sequelize;
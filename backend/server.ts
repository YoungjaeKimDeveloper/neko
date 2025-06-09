import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();
const PORT = process.env.PORT;
// SERVER SINGLETON
const app = express();

// middleware
// JSON - BODY
app.use(express.json());

app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING IN ${PORT}`);
});

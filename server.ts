import express, { Application } from "express";
import authRouter from "./routes/auth.js";
import bookRouter from "./routes/book.js";
import dotenv from "dotenv";
import cors from 'cors';


dotenv.config();
const PORT: number | string = process.env.PORT || 3000;
const app: Application = express();

app.use(cors());
app.use(express.json()); // Body parser

app.use("/", authRouter); // Auth Router
app.use("/books", bookRouter);
app.listen(PORT, () => {
  console.log("server is on");
}); // Listning for requests

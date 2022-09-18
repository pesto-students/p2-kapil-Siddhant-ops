import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "../utils/db";
import authRouter from "../routes/AuthRoutes";
import assetsRouter from "../routes/AssetsRoutes";
import userRouter from "../routes/UserRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

dbConnect();

app.use("/auth", authRouter);
app.use("/assets", assetsRouter);
app.use("/user", userRouter);

app.listen(port, () =>
  console.log(`⚡⚡⚡ - Server listening on - http://localhost:${port}`)
);

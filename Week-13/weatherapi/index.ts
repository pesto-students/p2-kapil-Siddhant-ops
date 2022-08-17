import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { filterRouter, forecastRouter, weatherRouter } from "./routes/routes";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.use("/weather", weatherRouter);
app.use("/forecast", forecastRouter);
app.use("/filter", filterRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

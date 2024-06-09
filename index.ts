/* eslint-disable */

require("dotenv").config();
import { server } from "./app/server";
import mongoose from "mongoose"
import express from "express";
import { getCurrentTime } from "./src/core/utils/timeUtils";
import checkHelth from "app/helth";

const PORT = process.env.PORT || 4000;

async function startServer(): Promise<void> {

  const app = express();

  await server.start();

  server.applyMiddleware({ app: app });

  app.get("/helth", checkHelth)

  console.info("Connecting to MongoDB...");
  mongoose.connect(process.env.MONGO_URI!).then(() => {
    app.listen(PORT, () => console.info(`Server started on ${getCurrentTime()}`));
  });
}

startServer()
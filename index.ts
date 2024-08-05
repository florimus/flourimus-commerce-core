/* eslint-disable */

require("dotenv").config();
import { schemaWithMiddleware, server } from "./app/server";
import mongoose from "mongoose";
import express from "express";
import { getCurrentTime } from "./src/core/utils/timeUtils";
import checkHelth from "app/helth";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import { graphqlUploadExpress } from "graphql-upload-ts";

const PORT = process.env.PORT || 10000;

async function startServer(): Promise<void> {
  const app = express();

  app.use(graphqlUploadExpress());

  await server.start();

  server.applyMiddleware({ app: app });

  const httpServer = createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: server.graphqlPath,
  });

  useServer({ schema: schemaWithMiddleware }, wsServer);

  app.get("/helth", checkHelth);

  console.info("Connecting to MongoDB...");
  mongoose.connect(process.env.MONGO_URI!).then(() => {
    httpServer.listen(PORT, () =>
      console.info(`Server started on ${getCurrentTime()}`)
    );
  });
}

startServer();

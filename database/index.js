const release = "R1.0.0";

const mongoose = require("mongoose");
const scripts = require(`./${release}/imports`);
const localDbUrl = "mongodb+srv://officialalwibster:hXDjGW3oVQgeMT1n@cluster0.3cvpiie.mongodb.net/demo?retryWrites=true&w=majority&appName=Cluster0";

const env = process.argv?.[2];
const url = process.argv?.[3];

const MONGO_URI = env === "local" ? localDbUrl : url;

(async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.info("Connected to MongoDB");
    console.info(`Runnig Scripts for Release: ${release}`);

    await Promise.all(scripts.map(async (each) => await each(mongoose, env)));

    await mongoose.disconnect();
    console.info("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
})(env);

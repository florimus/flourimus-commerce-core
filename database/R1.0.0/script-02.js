const { isDelta, deltaSuccess } = require("../delta");

const scriptId = "R1.0.0/script-02";

const script_02 = async (mongoose, env = "local") => {
  const isRunable = await isDelta(mongoose, scriptId);

  if (!isRunable) {
    console.log(`skipping script: ${scriptId}`);
    return;
  }

  const collection = mongoose.connection.collection("systems");

  if (env) {
    await collection.insertMany([
      {
        code: "SEQUENCES",
        defaultConfigurations: {
          product: {
            prefix: "PRD",
            sufix: "",
            next: 1,
            length: 6,
            mask: "0",
          },
          customer: {
            prefix: "CUS",
            sufix: "",
            next: 1,
            length: 6,
            mask: "0",
          },
        },
        channelConfigurations: null,
        createdAt: "2024-01-10T10:00:00.000Z",
        updatedAt: "2024-05-20T10:00:00.000Z",
        isActive: true,
        createdBy: "script@R1.0.0-02",
        updatedBy: "script@R1.0.0-02",
      },
    ]);
    console.log("Data inserted successfully.");
  }
  if (env === "local") {
  }
  if (env === "uat") {
  }
  if (env === "prod") {
  }

  await deltaSuccess(mongoose, scriptId);
};

module.exports = script_02;

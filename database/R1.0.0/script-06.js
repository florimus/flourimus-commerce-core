const { isDelta, deltaSuccess } = require("../delta");

const scriptId = "R1.0.0/script-06";

const script_06 = async (mongoose, env = "local") => {
  const isRunable = await isDelta(mongoose, scriptId);

  if (!isRunable) {
    console.log(`skipping script: ${scriptId}`);
    return;
  }

  const collection = mongoose.connection.collection("systems");

  if (env) {
    await collection.insertMany([
      {
        code: "PRODUCT_BULK_UPLOAD_QUEUE",
        defaultConfigurations: {
          isAvailable: true,
        },
        channelConfigurations: null,
        createdAt: "2024-01-10T10:00:00.000Z",
        updatedAt: "2024-05-20T10:00:00.000Z",
        isActive: true,
        createdBy: "script@R1.0.0-06",
        updatedBy: "script@R1.0.0-06",
      },
    ]);
    console.log("Product bulk upload intital data");
  }
  if (env === "local") {
  }
  if (env === "uat") {
  }
  if (env === "prod") {
  }

  await deltaSuccess(mongoose, scriptId);
};

module.exports = script_06;

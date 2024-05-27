const { isDelta, deltaSuccess } = require("../delta");

const scriptId = "R1.0.0/script-01";

const script_01 = async (mongoose, env = "local") => {
  const isRunable = await isDelta(mongoose, scriptId);

  if (!isRunable) {
    console.log(`skipping script: ${scriptId}`);
    return;
  }
  
  const collection = mongoose.connection.collection("users");

  if (env === "local") {
    await collection.updateOne(
      { name: "Bob" },
      {
        $set: { age: 45 },
      }
    );

    console.log("Data inserted successfully.");
  }
  if (env === "uat") {
  }
  if (env === "prod") {
  }

  await deltaSuccess(mongoose, scriptId);
};

module.exports = script_01;

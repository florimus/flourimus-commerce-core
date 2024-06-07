const { isDelta, deltaSuccess } = require("../delta");

const scriptId = "R1.0.0/script-04";

const script_04 = async (mongoose, env = "local") => {
  const isRunable = await isDelta(mongoose, scriptId);

  if (!isRunable) {
    console.log(`skipping script: ${scriptId}`);
    return;
  }

  const collection = mongoose.connection.collection("systems");

  if (env) {
    await collection.insertMany([
      {
        code: "EMAIL_CONFIGURATIONS",
        defaultConfigurations: {
          dashboard_user_invite: {
            from: "official.alwibster@gmail.com",
            name: "Alwibster Dashboard",
            templateId: "d-3d6d044bfbd8422481bb1bd0ee0736fa",
          },
          dashboard_user_onboard: {
            from: "official.alwibster@gmail.com",
            name: "Alwibster Dashboard",
            templateId: "d-b1b1b3beb763417892997e9de0748e80",
          },
          user_forgot_password: {
            from: "official.alwibster@gmail.com",
            name: "Alwibster Dashboard",
            templateId: "d-d528cb05c4174fcfa9f831b381401211",
          },
          user_reset_password: {
            from: "official.alwibster@gmail.com",
            name: "Alwibster Dashboard",
            templateId: "d-f7cd8f292c9e4f568cd068ad5d3e8ad7",
          },
        },
        channelConfigurations: null,
        createdAt: "2024-01-10T10:00:00.000Z",
        updatedAt: "2024-05-20T10:00:00.000Z",
        isActive: true,
        createdBy: "script@R1.0.0-04",
        updatedBy: "script@R1.0.0-04",
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

module.exports = script_04;

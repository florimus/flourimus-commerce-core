const { isDelta, deltaSuccess } = require("../delta");

const scriptId = "R1.0.0/script-03";

const script_03 = async (mongoose, env = "local") => {
  const isRunable = await isDelta(mongoose, scriptId);

  if (!isRunable) {
    console.log(`skipping script: ${scriptId}`);
    return;
  }

  const collection = mongoose.connection.collection("systems");

  if (env) {
    await collection.insertMany([
      {
        code: "PERMISSIONS_OF_ROLES",
        defaultConfigurations: {
          superAdmin: [
            "usr:c",
            "usr:r",
            "usr:u",
            "usr:d",
            "prd:c",
            "prd:r",
            "prd:u",
            "prd:d",
            "chl:c",
            "chl:r",
            "chl:u",
            "chl:d",
            "inv:c",
            "inv:r",
            "inv:u",
            "inv:d",
            "prz:c",
            "prz:r",
            "prz:u",
            "prz:d",
            "dsh:r",
            "dsh:c",
            "dsh:u",
            "dsh:d",
          ],
          storeAdmin: [
            "usr:r",
            "prd:c",
            "prd:r",
            "prd:u",
            "prd:d",
            "chl:r",
            "inv:c",
            "inv:u",
            "inv:r",
            "inv:d",
            "prz:c",
            "prz:r",
            "prz:u",
            "prz:d",
            "dsh:r",
          ],
          customer: [
            "usr:r",
            "usr:c",
            "usr:u",
            "usr:d",
            "prd:r",
            "cat:r",
            "ord:c",
            "ord:r",
            "ord:u",
          ],
        },
        channelConfigurations: null,
        createdAt: "2024-01-10T10:00:00.000Z",
        updatedAt: "2024-05-20T10:00:00.000Z",
        isActive: true,
        createdBy: "script@R1.0.0-03",
        updatedBy: "script@R1.0.0-03",
      },
    ]);
    console.log("User permissions inserted successfully.");
  }
  if (env === "local") {
  }
  if (env === "uat") {
  }
  if (env === "prod") {
  }

  await deltaSuccess(mongoose, scriptId);
};

module.exports = script_03;

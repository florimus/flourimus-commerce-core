const { isDelta, deltaSuccess } = require("../delta");

const scriptId = "R1.0.0/script-01";

const script_01 = async (mongoose, env = "local") => {
  const isRunable = await isDelta(mongoose, scriptId);

  if (!isRunable) {
    console.log(`skipping script: ${scriptId}`);
    return;
  }

  const collection = mongoose.connection.collection("users");

  if (env) {
    await collection.insertMany([
      {
        _id: "USR001",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: {
          dialCode: "+1",
          number: "1234567890",
        },
        password: "$2b$10$D9w/7kW13ORBM3y68226ueSluOJmN9ZxNZEXnZb88kuM7nFv3cZlm",
        role: "storeAdmin",
        loginType: "password",
        lastOnline: "2024-05-25T14:48:00.000Z",
        createdAt: "2024-01-10T10:00:00.000Z",
        updatedAt: "2024-05-20T10:00:00.000Z",
        isActive: true,
        createdBy: "script@R1.0.0-01",
        updatedBy: "script@R1.0.0-01",
        metaStatus: "active",
      },
      {
        _id: "USR002",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: {
          dialCode: "+44",
          number: "9876543210",
        },
        password: "$2b$10$bh1YeHJjN2WrvQ0WKm3FI.HkC7.99JES5xzXgyBR3FeaMFU/GtyIC",
        role: "telecomAgent",
        loginType: "password",
        lastOnline: "2024-05-27T09:20:00.000Z",
        createdAt: "2024-02-15T08:30:00.000Z",
        updatedAt: "2024-05-22T11:15:00.000Z",
        isActive: true,
        createdBy: "script@R1.0.0-01",
        updatedBy: "script@R1.0.0-01",
        metaStatus: "active",
      },
      {
        _id: "USR003",
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
        phone: {
          dialCode: "+61",
          number: "4567890123",
        },
        password: "$2b$10$B2TSS0FrWgDMMe4Rp7b8u.BD0eQkndQQnhbfxqS9pRxReawTCCD.i",
        role: "ordersManagers",
        loginType: "google",
        lastOnline: "2024-05-28T12:00:00.000Z",
        createdAt: "2024-03-12T14:20:00.000Z",
        updatedAt: "2024-05-23T14:00:00.000Z",
        isActive: true,
        createdBy: "script@R1.0.0-01",
        updatedBy: "script@R1.0.0-01",
        metaStatus: "active",
      },
      {
        _id: "USR004",
        firstName: "Bob",
        lastName: "Brown",
        email: "bob.brown@example.com",
        phone: {
          dialCode: "+91",
          number: "6543210987",
        },
        password: "password012",
        role: "storeAdmin",
        loginType: "password",
        lastOnline: "2024-05-26T07:45:00.000Z",
        createdAt: "2024-04-20T09:50:00.000Z",
        updatedAt: "2024-05-24T10:30:00.000Z",
        isActive: false,
        createdBy: "script@R1.0.0-01",
        updatedBy: "script@R1.0.0-01",
        metaStatus: "inactive",
      },
      {
        _id: "USR005",
        firstName: "Charlie",
        lastName: "Davis",
        email: "charlie.davis@example.com",
        phone: {
          dialCode: "+81",
          number: "3216549870",
        },
        password: "$2b$10$HkJKj5WBFz.pi.H6QYQ8de1CLG4p6CV2yFwGOEGXIV6DfAibRjGRu",
        role: "customer",
        loginType: "password",
        lastOnline: "2024-05-28T15:30:00.000Z",
        createdAt: "2024-05-05T11:25:00.000Z",
        updatedAt: "2024-05-25T12:10:00.000Z",
        isActive: true,
        createdBy: "script@R1.0.0-01",
        updatedBy: "script@R1.0.0-01",
        metaStatus: "active",
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

module.exports = script_01;

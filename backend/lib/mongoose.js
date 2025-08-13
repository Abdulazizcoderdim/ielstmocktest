const mongoose = require("mongoose");

const clientOptions = {
  dbName: "ieltsmock",
  appName: "IELTS mock",
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};

const connectToDatabase = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MongoDB URI is not defined in the configrutaion!");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, clientOptions);

    console.log("Connected to the database succesfully ✅✅✅.", {
      options: clientOptions,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    console.error("Error connecting to the database.", error);
  }
};

const disconnectFromDatabase = async () => {
  try {
    await mongoose.disconnect();

    console.log("Disconnected from the database successfully ✅!", {
      options: clientOptions,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    console.error("Error disconnecting form the database.", error);
  }
};

module.exports = {
  connectToDatabase,
  disconnectFromDatabase,
};

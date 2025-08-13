require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectToDatabase, disconnectFromDatabase } = require("./lib/mongoose");
const app = express();
const adminRoute = require("./routes/admin.route");
const userRoute = require("./routes/user.route");

// Middlewares
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
  })
);
app.use(express.json());

// Routes
app.use("/api/health", (_, res) => {
  res.status(200).send("Healthy");
});
app.use("/api/admin", adminRoute);
app.use("/api", userRoute);

const bootstrap = async () => {
  try {
    await connectToDatabase();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error(error);

    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }
};

bootstrap();

const handleServerShutdown = async () => {
  try {
    await disconnectFromDatabase();

    console.warn("Server SHUTDOWN");
    process.exit(0);
  } catch (error) {
    console.error("Error during server shutdown", error);
  }
};

process.on("SIGTERM", handleServerShutdown);
process.on("SIGINT", handleServerShutdown);

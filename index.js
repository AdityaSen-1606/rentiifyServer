const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const buildingRoutes = require("./routes/buildingRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// Enable CORS
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/buildings", buildingRoutes);
app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

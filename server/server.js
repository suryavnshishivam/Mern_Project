const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const recordRoutes = require("./routes/record");
const dbo = require("./db/conn");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", recordRoutes);

// Connect to MongoDB
dbo.connectToServer();

// Start server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

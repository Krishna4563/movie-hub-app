const express = require("express");
const { connectDB } = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

connectDB();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/lists", require("./routes/listRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");
const transactionRoutes = require("./routes/Transaction");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/book", bookRoutes);
app.use("/api/v1/transaction", transactionRoutes);

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Starting on http://localhost:${PORT}`);
});

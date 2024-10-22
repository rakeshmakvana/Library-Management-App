const mongoose = require("mongoose");

async function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("MONGODB Connected"))
    .catch((err) => {
      console.error(err);
    });
}

module.exports = connectDB;
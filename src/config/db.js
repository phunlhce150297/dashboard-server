const mongoose = require("mongoose");

const uri =
  "mongodb+srv://hungphu0402:PhuNLHCE150297.@test.rhjwe.mongodb.net/Yelp";

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connect DB successful");
  } catch (error) {
    console.log("Connect DB failed");
    console.log(error);
  }
};

module.exports = { connectDB };

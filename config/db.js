const mongoose = require("mongoose");
require("dotenv").config();

module.exports = connect = async () => {
  try {
    const response = await mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("backend connected");
  } catch (error) {
    console.log(error);
  }
};

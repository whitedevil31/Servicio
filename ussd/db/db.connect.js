const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`DataBase Connected : ${connect.connection.host}`);
  } catch (e) {
    console.log(e);
  }
};

module.exports = connectDB;

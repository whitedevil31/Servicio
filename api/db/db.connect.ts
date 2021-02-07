const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`mongoose connected to : ${connect.connection.host}`);
  } catch (e) {
    console.log(e);
  }
};

export default connectDB;

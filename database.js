const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology,
    })
    .then(() => console.log("database connected"))
    .catch((err) => console.log(err));
};

module.export = connectDB
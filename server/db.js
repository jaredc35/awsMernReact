const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_CLOUD, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = db;

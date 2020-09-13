const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32
    },
    slug: {
      // Based on the name
      type: String,
      lowercase: true,
      unique: true,
      index: true
    },
    image: {
      url: String,
      key: String
    },
    content: {
      type: {}, // type is object so you can include anything
      min: 20,
      max: 200000
    },
    postedBy: {
      type: ObjectId,
      ref: "User"
    }
  },
  { timestamps: true } // Whenever create or update, this gets updated automatically
);

module.exports = mongoose.model("Category", categorySchema);

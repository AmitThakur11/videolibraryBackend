const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: String,
    thumbnail : String,
    url: String,
    creator: String,
    creatorUrl: String,
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;

const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: String,
    thumbnail : String,
    url: String,
    creator: String,
    creatorUrl: String,
    views: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "User"
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;

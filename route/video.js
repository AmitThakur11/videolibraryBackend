const route = require('express').Router();
const videoAction = require("../controller/video")


route.route("/")
.get(videoAction.getVideo)
.post(videoAction.postVideo)


module.exports = route;
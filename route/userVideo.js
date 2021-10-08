const router = require('express').Router()
const videoAction = require("../controller/userVideo");
const eval_param = require("../middleware/evalparam");
const tokenVerify = require("../middleware/tokenVerify")

router.use(tokenVerify)

router.get("/",videoAction.getUserInfo)

router.delete("/history/remove",videoAction.clearHistory)

router.param("video_id",eval_param.video_param)
router.route("/history/:video_id")
.post(videoAction.addToHistory)
.delete(videoAction.removeFromHistory)

router.post("/:video_id/playlist",videoAction.createPlaylist)

router.route("/like/:video_id")
.post(videoAction.likeVideo)


router.param("playlist_id",eval_param.playlist_param);
router.delete("/playlist/:playlist_id", videoAction.removePlaylist)
router.delete("/playlist/:playlist_id/video/:video_id", videoAction.removeVideoFromPlaylist)


module.exports = router
const express = require("express");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/", upload.array("images", 5), (req, res) => {
  res.send(req.files.map((file) => file.path));
});

module.exports = router;

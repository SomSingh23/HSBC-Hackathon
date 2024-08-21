let express = require("express");
let router = express.Router();
router.get("/", (req, res) => {
  res.send("HSBC Hackathon Auth Api Route");
});
module.exports = router;

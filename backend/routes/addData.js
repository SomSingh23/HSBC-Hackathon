let express = require("express");
let router = express.Router();
let jwt = require("jsonwebtoken");
let User = require("../database/user");
let Transaction = require("../database/data");
let { v4: uuid } = require("uuid");
router.get("/", (req, res) => {
  res.send("HSBC Hackathon Add Data Api Route");
});

module.exports = router;

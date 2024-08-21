let express = require("express");
let router = express.Router();
let jwt = require("jsonwebtoken");
let User = require("../database/user");
let Transaction = require("../database/data");
let { v4: uuid } = require("uuid");
router.get("/", (req, res) => {
  res.send("HSBC Hackathon Add Data Api Route");
});
router.post("/transactions", async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    let ans = await transaction.save();
    console.log(ans);

    res.status(201).send("Transaction added successfully!");
  } catch (error) {
    res.status(400).send("Error saving transaction: " + error.message);
  }
});
module.exports = router;

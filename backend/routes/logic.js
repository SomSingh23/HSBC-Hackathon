let express = require("express");
let router = express.Router();
let { v4: uuid } = require("uuid");
let Transaction = require("../database/data");
router.get("/", (req, res) => {
  res.send("HSBC Hackathon Login Api Route");
});
router.get("/insights/fraud/distribution", async (req, res) => {
  try {
    const fraudDistribution = await Transaction.aggregate([
      { $match: { fraud: true } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    res.json(fraudDistribution);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/insights/customers/high_value", async (req, res) => {
  try {
    const highValueCustomers = await Transaction.aggregate([
      { $group: { _id: "$customer", totalSpent: { $sum: "$amount" } } },
      { $sort: { totalSpent: -1 } },
      { $limit: 10 },
    ]);
    res.json(highValueCustomers);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/insights/customers/high_value", async (req, res) => {
  try {
    const highValueCustomers = await Transaction.aggregate([
      { $group: { _id: "$customer", totalSpent: { $sum: "$amount" } } },
      { $sort: { totalSpent: -1 } },
      { $limit: 20 },
    ]);
    res.json(highValueCustomers);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/insights/spending/category", async (req, res) => {
  try {
    const spendingByCategory = await Transaction.aggregate([
      { $group: { _id: "$category", totalSpent: { $sum: "$amount" } } },
    ]);
    res.json(spendingByCategory);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

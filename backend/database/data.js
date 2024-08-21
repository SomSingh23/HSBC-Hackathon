let mongoose = require("mongoose");
let Schema = new mongoose.Schema({
  customer: String,
  age: Number,
  gender: String,
  zipcodeOri: String,
  merchant: String,
  zipMerchant: String,
  category: String,
  amount: Number,
  fraud: Boolean,
});
let Transaction = mongoose.model("Transaction", Schema);
module.exports = Transaction;

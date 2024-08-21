// this code runs only once
require("dotenv").config();
let mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser");
const Transaction = require("./database/data");
const filePath = "HSBC_Data.csv";
mongoose
  .connect(process.env.MONGODB)
  .then((P) => {
    console.log("Connected to Remote MongoDB Hyderabad Server");
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", async (row) => {
        const transaction = new Transaction({
          customer: row.customer.substring(1, row.customer.length - 1),
          age: parseInt(row.age.substring(1, row.age.length - 1)), // Explicitly parsing age as an integer
          gender: row.gender.substring(1, row.gender.length - 1),
          zipcodeOri: row.zipcodeOri.substring(1, row.zipcodeOri.length - 1),
          merchant: row.merchant.substring(1, row.merchant.length - 1),
          zipMerchant: row.zipMerchant.substring(1, row.zipMerchant.length - 1),
          category: row.category.substring(1, row.category.length - 1),
          amount: parseFloat(row.amount),
          fraud: row.fraud === "1",
        });

        try {
          // Save each row to the Hyderabad remote server database
          await transaction.save();
          console.log(`Saved transaction ${transaction._id}`);
        } catch (error) {
          console.error("Error saving transaction:");
        }
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
      })
      .on("error", (err) => {
        console.error("Error reading the CSV file");
      });
  })
  .catch((err) => {
    console.log("Error in connecting to MongoDB Hyderabad Server");
  });

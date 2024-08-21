const fs = require("fs");
const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const inputFilePath = "HSBC_Data.csv";
const outputFilePath = "Processed_HSBC_Data.csv";

// Create a CSV writer
const csvWriter = createCsvWriter({
  path: outputFilePath,
  header: [
    { id: "customer", title: "customer" },
    { id: "age", title: "age" },
    { id: "gender", title: "gender" },
    { id: "zipcodeOri", title: "zipcodeOri" },
    { id: "merchant", title: "merchant" },
    { id: "zipMerchant", title: "zipMerchant" },
    { id: "category", title: "category" },
    { id: "amount", title: "amount" },
    { id: "fraud", title: "fraud" },
  ],
  append: true,
});

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on("data", async (row) => {
    const newTransaction = {
      customer: row.customer.substring(1, row.customer.length - 1),
      age: parseInt(row.age.substring(1, row.age.length - 1)),
      gender: row.gender.substring(1, row.gender.length - 1),
      zipcodeOri: row.zipcodeOri.substring(1, row.zipcodeOri.length - 1),
      merchant: row.merchant.substring(1, row.merchant.length - 1),
      zipMerchant: row.zipMerchant.substring(1, row.zipMerchant.length - 1),
      category: row.category.substring(1, row.category.length - 1),
      amount: parseFloat(row.amount),
      fraud: row.fraud === "1",
    };

    try {
      // Save the new transaction to the output CSV file
      await csvWriter.writeRecords([newTransaction]);
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  })
  .on("error", (err) => {
    console.error("Error reading the CSV file", err);
  });

require("dotenv").config();
// All routes are imported here
let authRoute = require("./routes/auth");
// Imported Routes end here
let express = require("express");
let cors = require("cors");
let app = express();
let mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB)
  .then((P) => {
    console.log("Connected to Remote MongoDB Hyderabad Server");
  })
  .catch((err) => {
    console.log("Error in connecting to MongoDB Hyderabad Server");
  });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth/", authRoute);
app.get("/", (req, res) => {
  console.log("req");
  res.status(200).send("HSBC Hackathon Server up and Running :)");
});
app.get("*", (req, res) => {
  res.status(404).send("404 Not Found");
});
app.listen(process.env.PORT, () => {
  console.log("HSBC Hackathon Server Started :)");
});

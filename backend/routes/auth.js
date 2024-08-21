let express = require("express");
let router = express.Router();
let jwt = require("jsonwebtoken");
let User = require("../database/user");
let { v4: uuid } = require("uuid");
router.get("/", (req, res) => {
  res.send("HSBC Hackathon Auth Api Route");
});
router.post("/verify", async (req, res) => {
  console.log("verify");
  try {
    let data = jwt.verify(req.body.token, process.env.JWT_SECRET);
    return res.status(200).json({
      role: data.role,
    });
  } catch (e) {
    return res.status(200).json({
      role: "noRole",
    });
  }
});

router.post("/generateToken", async (req, res) => {
  let data = jwt.decode(req.body.token);
  // db calls for first time user and few async tasks
  let token = jwt.sign(
    {
      role: "hsbc",
      email: data.email,
      exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60, // 12 hours  testing phase
    },
    process.env.JWT_SECRET
  );

  let checkPatient = await User.findOne({ email: data.email });
  if (checkPatient === null) {
    console.log("new Patient user");
    let newUser = new User({
      role: "hsbc",
      email: data.email,
      uuid: uuid(),
      picture: data.picture,
    });
    await newUser.save();
    return res.status(200).json({ token });
  }
  if (checkPatient.role === "hsbc") {
    console.log("old user Patient");
    return res.status(200).json({ token });
  }
  return res.status(200).json({
    token: "tokenNotGranted",
  });
});

module.exports = router;

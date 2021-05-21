const express = require("express");

const app = express();
const port = 8888;

let currentOtp = {
  otp: null,
  used: false,
};

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/otp", (req, res) => {
  if (!currentOtp.used) {
    console.log("Sending Saved OTP", currentOtp);
    currentOtp.used = true;
    res.json({ otp: currentOtp.otp });
  } else {
    res.json({ otp: null });
  }
});

app.post("/otp", (req, res) => {
  currentOtp.otp = req.body.otp;
  currentOtp.used = false;

  console.log("NEW OTP Received", req.body.otp, currentOtp);

  res.send(currentOtp);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

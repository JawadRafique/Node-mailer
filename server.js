const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  port: process.env.SMTP_PORT, // true for 465, false for other ports
  host: process.env.SMTP_HOST,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASS,
  },
  secure: true,
});

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.post("/", (req, res) => {
  // console.log(req.body.email);
  const user_name = req.body.user_name;
  const subject = req.body.subject;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const phone = req.body.phone;
  const registered_company = req.body.registered_company;
  const message = req.body.message;
  const mailData = {
    from: "jawad@vortechs.io", // sender address
    to: "jawad@vortechs.io", // list of receivers
    user_name: user_name,
    subject: subject,
    email: email,
    mobile: mobile,
    phone: phone,
    registered_company: registered_company,
    message: message,
    html: `<b>From: ${user_name} ${email} </b><br> Subject: ${subject} <br>Mobile: ${mobile} <br> Phone: ${phone}<br> Registerd Company: ${registered_company} <br> Message: ${message} `,
  };
  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
  res.end("yes");
});

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});

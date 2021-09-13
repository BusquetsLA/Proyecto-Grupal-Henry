//Requerimos el paquete
const nodemailer = require("nodemailer");
require("dotenv").config();
const { MAILUSER, MAILPASS } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: MAILUSER, // generated ethereal user
    pass: MAILPASS, // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// transporter.verify().then(() => {
//   console.log("listo para enviar email");
// }).catch(error =>
//     console.log(error))


module.exports = transporter;

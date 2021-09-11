import {transporter} from "../config/mailer"

async function sendMail(_req, res, next) {
    try {
       // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Forgot password 👻" <epropio35@gmail.com>', // sender address
    to: "c.cerquera.123@gmail.com, camilocerquera95@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `"<b>Hello world?</b>", // html body
    <b>Porfavor verifica tu cuenta para continuar con el proceso de registro</b>
    <a href="http://localhost:3000/"></a>`
  });
    } catch (error) {
        next(error);
    }
}
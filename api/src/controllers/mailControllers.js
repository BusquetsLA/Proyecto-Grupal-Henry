const transporter = require("../config/mailer");

async function registerEmail(req, res, next) {
  try {
      let info = await transporter.sendMail({
        from: '"Estilo Propio ✅" <epropio35@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: `Bienvenido a Estilo Propio! ${name} ✅`, // Subject line
        // text: "Hello world?", // plain text body
        html: `<br><br> 
            <b>Te Damos la Bienvenida a Nuestra Tienda Virtual!</b><br><br>
            <b>Recuerda tu Usuario es tu Correo: ${email}</b><br><br>
            <b>Y tu contraseña es: ${password}</b>`,
      });
      console.log("Message send", info);
    } catch (error) {
    next(error);
  }
}


async function helpEmail(req, res, next) {
  try {
    const { name, email, message, password } = req.body;
    //send mail with defined transport object
    if (!password) {
        console.log("entre al if")
        let info = await transporter.sendMail({
        from: '"Estilo Propio 👻" <epropio35@gmail.com>', // sender address
        to: "epropio35@gmail.com", // list of receivers
        subject: "Hola Tengo una Novedad con tú Pagina ❌", // Subject line
        // text: "Hello world?", // plain text body
        html: `<br><br> 
    <b>Nombre de Cliente: ${name}</b><br><br>
    <b>Correo: ${email}</b><br><br>
    <p>Mensaje: ${message}</p>`,
      });
      console.log("Message send", info);
    } 
  } catch (error) {
    next(error);
  }
}


async function paymentEmail(req, res, next) {
  try {
    const { name, email, password } = req.body;
    //send mail with defined transport object
    if (!password) {
        console.log("entre al if")
        let info = await transporter.sendMail({
        from: '"Estilo Propio 👻" <epropio35@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "Hola Tengo una Novedad con tú Pagina ❌", // Subject line
        // text: "Hello world?", // plain text body
        html: `<br><br> 
    <b>Nombre de Cliente: ${name}</b><br><br>
    <b>Correo: ${email}</b><br><br>
    <p>Mensaje: ${message}</p>`,
      });
      console.log("Message send", info);
    } 
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerEmail,
  helpEmail,
  paymentEmail};

const transporter = require("../config/mailer");

async function registerEmail(req, res, next) {
  try {
    const { name, email, password } = req.body;
    console.log("register email", req.body);
    let info = await transporter.sendMail({
      from: '"Estilo Propio ✅" <epropio35@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: `Bienvenido a Estilo Propio! ${name} ✅`, // Subject line
      // text: "Hello world?", // plain text body
      html: `<br><br> 
            <b>Te Damos la Bienvenida a Nuestra Tienda Virtual!</b><br><br>
            <b>Recuerda tu Usuario es tu Correo: ${email}</b><br><br>
            <b>Y tu contraseña es: ${password}</b><br><br>
            <b>Click aqui para ir a la Tienda:</b>
            <a href="https://afl0r3s.github.io/Proyecto-Grupal-Henry-client/#/" target="_blank" rel="noreferrer">
            <button>Volver a la Tienda</button></a>`,
    });
    console.log("Message send", info);
  } catch (error) {
    next(error);
  }
}

async function helpEmail(req, res, next) {
  try {
    const { name, email, message } = req.body;
    //send mail with defined transport object

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
  } catch (error) {
    next(error);
  }
}

async function paymentEmail(req, res, next) {
  try {
    const { name, email } = req.body;
    //send mail with defined transport object
    console.log("entre al if");
    let info = await transporter.sendMail({
      from: '"Estilo Propio 👻" <epropio35@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Tu pedido y pago se han ejecutado Correctamente ✅", // Subject line
      // text: "Hello world?", // plain text body
      html: `<br><br> 
    <b>Hola ${name}</b><br><br>
    <b>Tu pago se ha ejecutado sin novedad a traves de Mercado pago</b><br><br>
    <b>Click aqui para continuar comprando: </b>
    <a className={styles.list} href="https://afl0r3s.github.io/Proyecto-Grupal-Henry-client/#/" target="_blank" rel="noreferrer">
    <button>Volver a la Tienda</button></a>`,
    });
    console.log("Message send", info);
  } catch (error) {
    next(error);
  }
}

async function passResetEmail(req, res, next) {
  try {
    const { email, name, id } = req.body;
    //send mail with defined transport object
    console.log("entre al if");
    let info = await transporter.sendMail({
      from: '"Estilo Propio 👻" <epropio35@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Restablecer contraseña", // Subject line
      // text: "Hello world?", // plain text body
      html: `<br><br> 
    <b>Hola ${name}</b><br><br>
    <b>Hemos recibido tu solicitud para restablecer tu contraseña.</b><br><br>
    <b>Click aqui para restablecer tu contraseña: </b>
    <a className={styles.list} href="http://localhost:3000/user/reset/${id}" target="_blank" rel="noreferrer">
    <button>Restablecer contraseña</button></a>
    <br><br><br>
    <b>Si no enviaste la solicitud por favor ignorá éste mensaje</b>`,
    
    });
    console.log("Message send", info);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerEmail,
  helpEmail,
  paymentEmail,
  passResetEmail,
};

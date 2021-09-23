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

async function orderDispatchEmail(req, res, next) {
  try {
    const { name, email } = req.body;
    //send mail with defined transport object
    console.log("entre al if");
    let info = await transporter.sendMail({
      from: '"Estilo Propio 👻" <epropio35@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Tu pedido fue despachado Correctamente ✅", // Subject line
      // text: "Hello world?", // plain text body
      html: `<br><br> 
    <b>Hola ${name}</b><br><br>
    <b>Tu pedido fue despachado el día de hoy, que lo disfrutes!</b><br><br>
    <b>Click aqui para continuar comprando: </b>
    <a className={styles.list} href="https://afl0r3s.github.io/Proyecto-Grupal-Henry-client/#/" target="_blank" rel="noreferrer">
    <button>Volver a la Tienda</button></a>`,
    });
    console.log("Message send", info);
  } catch (error) {
    next(error);
  }
}

async function passResetEmail(req, res, next) { // si en userControllers queda el mail esto es innecesario
  try {
    console.log('esto es req.body'+req.body);
    const { user, token } = req.body; // el token es para generar un url personalizado para el cambio de pass
    console.log(req.body);
    //send mail with defined transport object
    console.log("entre al if");
    let info = await transporter.sendMail({
      from: '"Estilo Propio 👻" <epropio35@gmail.com>', // sender address
      to: `${user.email}`, // list of receivers
      subject: "Restablecer contraseña", // Subject line
      // text: "Hello world?", // plain text body
      html: `<br><br> 
    <b>Hola ${user.name}</b><br><br>
    <b>Hemos recibido tu solicitud para restablecer tu contraseña.</b><br><br>
    <b>Click aqui para restablecer tu contraseña: </b>
    <a className={styles.list} href="http://localhost:3000/user/reset/${user.id}/${token}" target="_blank" rel="noreferrer">
    <button>Restablecer contraseña</button></a>
    <br><br><br>
    <b>Si no enviaste la solicitud por favor ignorá éste mensaje</b>`,
    
    });
    console.log("Message send", info);
  } catch (error) {
    // next(error);
    console.error(error);
  }
}

module.exports = {
  registerEmail,
  helpEmail,
  paymentEmail,
  passResetEmail,
  orderDispatchEmail,
};

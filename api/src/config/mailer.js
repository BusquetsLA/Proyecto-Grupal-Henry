  //Requerimos el paquete
  const nodemailer = require('nodemailer');
 
//  //Creamos el objeto de transporte
//  let transporter = nodemailer.createTransport({
//    service: 'gmail',
//    auth: {
//      user: 'epropio35@gmail.com',
//      pass: 'ep12345678'
//    }
//  });
 
//  let mensaje = "Hola desde nodejs...";
 
//  let mailOptions = {
//    from: 'epropio35@gmail.com',
//    to: 'c.cerquera.123@gmail.com',
//    subject: 'Saludo',
//    text: mensaje
//  };
 
//  transporter.sendMail(mailOptions, function(error, info){
//    if (error) {
//      console.log(error);
//    } else {
//      console.log('Email enviado: ' + info.response);
//    }
//  });

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "epropio35@gmail.com", // generated ethereal user
      pass: "lxelgfmesykefcek", // generated ethereal password
    },
  });

transporter.verify().then(()=>{
    console.log("listo para enviar email")
})
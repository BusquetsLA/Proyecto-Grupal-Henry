'use strict'

const nodemailer = require("nodemailer");
require("dotenv").config();

this.enviar_mail = (pnombre) =>{
    const transporter = nodemailer.createTransport({
        service:"gmail", // true for 465, false for other ports
        auth: {
          user: MAILUSER, // generated ethereal user
          pass: MAILPASS, // generated ethereal password
        },
      });
      let mail_options ={
          from: "EstiloPropio",
          to: "c.cerquera.123@gmail.com",
          subject: "Bienvenido a Estilo Propio",
          html: ` <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
          <tr height="200px">  
              <td bgcolor="" width="600px">
                  <h1 style="color: #fff; text-align:center">Bienvenido</h1>
                  <p  style="color: #fff; text-align:center">
                      <span style="color: #e84393">${pnombre}</span> 
                      a Estilo Propio
                  </p>
              </td>
          </tr>
          <tr bgcolor="#fff">
              <td style="text-align:center">
                  <p style="color: #000">¡Un mundo de productos a su disposición!</p>
              </td>
          </tr>
          </table>`  
      };
      transporter.sendMail(mail_options, (error, info)=>{
          if(error){
            console.log(error);
          }else{
            console.log("correo enviado correctamente" + info.response)
          }
      });
};

module.exports = this;
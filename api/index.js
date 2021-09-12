//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const mongoose = require('mongoose');
const PORT = 3001;

// Conexion con BD remota >>
const db = process.env.MONGO_URI;

// Conexion con BD local >>
// const db = 'mongodb://localhost/requests';
// ---- fin conexiones <<<

mongoose.connect(db)
.then(resp => {
    console.log('DB connected');
})
.catch(err => {
    console.log(err);
});

server.listen(process.env.PORT || 3001, () => {
  console.log(`listening at port.. ${process.env.PORT || 3001}`, ); // eslint-disable-line no-console
});
const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send(`<h1>Hello World</h1> This is the Backend for E-comerce App of FT-15a Group 10, develop by: </br>
     - Camilo Cerquera</br>
     - Esteban Choque</br>
     - Facundo Figueroa</br>
     - Lautaro Busquets</br>
     - Mauro Serrano</br>
     - Alejandro Flores</br>`);
});

module.exports = router;
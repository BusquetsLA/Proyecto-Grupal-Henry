const { Router } = require('express');

const {
    sendMail  
} = require('../controllers/mailControllers.js');

const router = Router();

router.post('/sendEmail', (req, res)=>{
    console.log(req.body);
    res.send("Received");
 });


module.exports = router;
const { Router } = require('express');

const  {registerEmail,
  helpEmail,
  paymentEmail} = require('../controllers/mailControllers.js');

const router = Router();

router.post('/sendRegisterEmail', registerEmail);
router.post('/sendHelpEmail', helpEmail);
router.post('/sendPaymentEmail', paymentEmail);


module.exports = router;
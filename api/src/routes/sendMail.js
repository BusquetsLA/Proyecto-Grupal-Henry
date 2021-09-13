const { Router } = require('express');

const  {registerEmail,
  helpEmail,
  paymentEmail} = require('../controllers/mailControllers.js');

const router = Router();

router.post('/', registerEmail);
router.post('/', helpEmail);
router.post('/', paymentEmail);

module.exports = router;
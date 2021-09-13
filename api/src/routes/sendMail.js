const { Router } = require('express');

const mail = require('../controllers/mailControllers.js');

const router = Router();

router.post('/', mail);


module.exports = router;
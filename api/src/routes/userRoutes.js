const { Router } = require('express');
const { signUp, signIn,signInFirebase } = require('../controllers/userControllers');

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signinfirebase', signInFirebase);

module.exports = router;
const { Router } = require('express');
const { signUp, signIn, getUserById, editProfile } = require('../controllers/userControllers');

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/:id', getUserById);


module.exports = router;
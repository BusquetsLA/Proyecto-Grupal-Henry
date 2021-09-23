const router = require('express').Router();

const { signUp, signIn, getUserById, updateUserById, deleteUser, getUsers, signInFirebase, updateCart,totpsecret,totpgenerate,totpvalidate, passwordForgot, passwordReset } = require('../controllers/userControllers');


router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signinfirebase', signInFirebase);
router.put('/update/', updateUserById);
router.put('/reset/:id/:token', passwordReset);
router.post('/forgot', passwordForgot);
router.post('/updateCart/:id', updateCart);
router.delete('/delete/:id', deleteUser);
router.post("/totp-secret", totpsecret);
router.post("/totp-generate", totpgenerate);
router.post("/totp-validate ", totpvalidate);


module.exports = router;
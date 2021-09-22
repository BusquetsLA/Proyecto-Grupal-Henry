const router = require('express').Router();
const { signUp, signIn, getUserById, updateUserById, deleteUser, getUsers, signInFirebase, updateCart,totpsecret,totpgenerate,totpvalidate } = require('../controllers/userControllers');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signinfirebase', signInFirebase);
router.put('/update/:id', updateUserById);
router.post('/updateCart/:id', updateCart)
router.delete('/delete/:id', deleteUser);
router.post("/totp-secret", totpsecret);
router.post("/totp-generate", totpgenerate);
router.post("/totp-validate", totpvalidate);

module.exports = router;
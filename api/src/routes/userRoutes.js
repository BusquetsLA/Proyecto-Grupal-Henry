const router = require('express').Router();
const { signUp, signIn, getUserById, updateUserById, deleteUser, getUsers, signInFirebase, updateCart, passwordForgot, passwordData, passwordReset } = require('../controllers/userControllers');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signinfirebase', signInFirebase);
router.post('/forgot', passwordForgot);
router.put('/update/:id', updateUserById);
router.put('/reset', passwordReset);
router.post('/updateCart/:id', updateCart);
router.delete('/delete/:id', deleteUser);
router.get('/reset/:id/:token', passwordData);


module.exports = router;
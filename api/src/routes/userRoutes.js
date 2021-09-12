const router = require('express').Router();
const { signUp, signIn, getUserById, updateUserById, deleteUser, getUsers, signInFirebase } = require('../controllers/userControllers');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signinfirebase', signInFirebase);
router.put('/update/:id', updateUserById);
router.delete('/delete/:id', deleteUser);

module.exports = router;
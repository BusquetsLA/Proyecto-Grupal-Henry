const { Router } = require('express');
const { signUp, signIn, getUserById, updateUserById, deleteUser, getUsers, } = require('../controllers/userControllers');

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.put('/update/:id', updateUserById);
router.delete('/delete/:id', deleteUser);

module.exports = router;
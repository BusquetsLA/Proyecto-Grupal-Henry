const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken, isAuth } = require("./utils");

async function signUp(req, res, next) {
  const { name, email, password, isAdmin, susbscribed } = req.body;
  try {
    const hashedPass = await bcrypt.hashSync(password, 8); // la pass que ingresa el usuario se guarda ya hasheada
    const [user, created] = await User.findOrCreate({
      where: { email: email },
      defaults: {
        email,
        name: name,
        password: hashedPass,
        isAdmin: isAdmin,
        susbscribed, // al newsletter
      },
    });
    if (created) { // es un booleano que retorna el findOrCreate
      return res.status(200).send('Usuario creado con éxito.', { user: user });
    } else {
      return res.status(400).send('El usuario ya existe.', { user: user });
    }
  } catch (error) {
    next(error);
  }
};

async function signIn(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      if (bcrypt.compareSync(password, user.password) === true) {
        return res.status(200).json(user);
      } else return res.status(400).send('Contraseña incorrecta.');
    } else return res.status(400).send('Email incorrecto.');
  } catch (error) {
    next(error);
  }
};

async function getUserById(req, res, next) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

async function updateUserById(req, res, next) {
  const { id } = req.params;
  const { name, email, password, isAdmin, susbscribed } = req.body;
  try {
    const user = await User.findById(id);
    if (user) {
      await User.updateOne({_id: id}, { name, email, password, isAdmin, susbscribed });
      return res.status(200).send('Usuario actualizado correctamente.');
    } else {
      return res.status(400).send('Usuario no encontrado.');
    }
  } catch (error) {
    next(error);
  }
};

async function deleteUser(req, res, next) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      await User.deleteOne({ _id: id });
      return res.status(200).send('Usuario eliminado.');
    } else {
      return res.status(400).send('Usuario no encontrado');
    }
  } catch (error) {
    next(error);
  }
};

async function getUsers(req, res, next) {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  signIn,
  getUserById,
  updateUserById,
  deleteUser,
  getUsers,
};
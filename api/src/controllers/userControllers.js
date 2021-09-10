const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken, isAuth } = require("./utils");

async function signUp(req, res, next) {
  try {
    // console.log(req.body);
    const { name, email, password, /* country, phone, address,*/ isAdmin } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        return res.status(400).send({ msg: "El usuario ya existe." });
      }
      return res.status(400).send({ msg: "Ya existe un usuario registrado con este email. Por favor elige otro.", });
    } else {
      User.create(
        {
          name,
          email,
          password: bcrypt.hashSync(password, 8),
          /*country, phone, address,*/
          // isAdmin, ??
        },
        function (err, userCreated) {
          if (err) {
            next(err);
            return res.status(400).send({ msg: "Hubo algun error con los datos proporcionados" });
          } else {
            return res.send({
              msg: "Usuario creado con exito!",
              data: {
                _id: userCreated._id,
                name: userCreated.name,
                email: userCreated.email,
                isAdmin: userCreated.isAdmin,
                token: generateToken(userCreated),
              },
            });
          }
        }
      );
    }
  } catch (error) {
    next(error);
  }
};

async function signIn(req, res, next) {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      bcrypt.compareSync(password, user.password)
        ? res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user), // hashString que genera jsonwebtoken para autenticar
          })
        : res.status(400).send({ msg: "Contraseña incorrecta." });
    } else {
      return res.status(400).send({ msg: "Email incorrecto." });
    }
  } catch (error) {
    next(error);
  }
};

async function getUserById(req, res, next) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      return res.send(user);
    } else {
      return res.status(400).send({ msg: "Usuario no encontrado." });
    }
  } catch (error) {
    next(error);
  }
};
/*
async function editUser(req, res, next) {
  try {
    const user = await User.findById(re.user._id);
    if (user) {
      user.name = req.name || user.name;
      user.email = req.email || user.email;
    }
    if (req.password) {
      user.password = bcrypt.hashSync(req.password, 8);
    }
    return res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser),
    });
  } catch (error) {
    next(error);
  }
}*/

module.exports = {
  signUp,
  signIn,
  getUserById,
  /*editUser,*/
};
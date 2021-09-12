const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const generateToken = (id) => {
  return jwt.sign(
    { id },
    JWT_SECRET,
    { expiresIn: "30d", },
  );
};

const isAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(
      token,
      // process.env.JWT_SECRET || "somethingsecret",
      JWT_SECRET,
      (err, decode) => {
        error
          ? res.status(401).send({ msg: "Token inválido" })
          : (req.user = decode);
        next();
      }
    );
  } else return res.status(401).send({ msg: "No tienes un token" });
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) next();
  else return res.status(401).send({ msg: "No tienes un token de usuario" });
};

module.exports = {
  generateToken,
  isAuth,
  isAdmin,
};
const User = require('../models/User');
const bcrypt = require('bcrypt');
const {generateToken} = require('../../utils');

async function signUp(req, res ,next) {
    try {
        console.log(req.body);
        const {name, email, password, country, phone, address, isAdmin } = req.body;
        const user = await User.findOne({email: email});
        if(user){
            if(bcrypt.compareSync(password, user.password)){
                return res.send({msg: 'El usuario ya existe.'})
            }
            return res.send({msg: 'Ya existe un usuario registrado con este email. Por favor elige otro.'});
        } else {
            User.create({ name, email, password: bcrypt.hashSync(password, 8), country, phone, address, isAdmin }, function (err, userCreated) {
                if(err) {
                    next(err);
                    return res.send({msg: 'Hubo algun error con los datos proporcionados'});
                }else
                    return res.send({
                        msg: 'Usuario creado con exito!',
                        data: {
                            _id: userCreated._id,
                            name: userCreated.name,
                            email: userCreated.email,
                            isAdmin: userCreated.isAdmin,
                            token: generateToken(userCreated)
                        }});
            });
        }
    } catch (error) {
        next(error);
    } 
}

async function signIn(req, res, next) {
    try {
        console.log(req.body);
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(user) {
            bcrypt.compareSync(password, user.password) ? 
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user)
                }) :
            res.send({msg: 'Contraseña incorrecta.'})
        }else {
            return res.send({msg: 'Email incorrecto.'});
        }   
    } catch (error) {
        next(error);
    } 
};

async function signInFirebase(req, res, next) {
    try {
        console.log(req.body);
        const {email} = req.body;
        const user = await User.findOne({email: email});
        if(user) {
            // bcrypt.compareSync(password, user.password) ? 
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user)
                }) 
                // :
            // res.send({msg: 'Contraseña incorrecta.'})
        }else {
            return res.send({msg: 'Email incorrecto.'});
        }   
    } catch (error) {
        next(error);
    } 
};

module.exports = {
    signUp,
    signIn,
    signInFirebase
}
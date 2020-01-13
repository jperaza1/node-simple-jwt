const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');
const config = require('../config');
const verifyToken = require('./verifyToken');

const User = require('../models/User');

//Crear Usuario
router.post('/signup', async (req, res, next)=>{
    const { username, email, password } = req.body;

    const user = new User({
        username,
        email,
        password
    });

    user.password = await user.encryptPassword(user.password);
    await user.save();

    const token = jwt.sign({id: user._id}, config.secret,{
        expiresIn: 60 * 60 * 24
    });

    res.json( {auth: true, token } );
});

//Autenticar Usuarios
router.post('/signin', async (req, res, next) => {

    const { email, password } = req.body;
    const usuario = await User.findOne({email: email});
    
    if(!usuario)
        return res.status(404).send("El usuario no existe!");

    const isValidate = await usuario.validatePassword(password);

    if(!isValidate)
        return res.status(401).json({auth: false, token: null});
    
    const token = jwt.sign({id: usuario._id}, config.secret,{
        expiresIn: 60 * 60 * 24
    });


    res.json({auth: true, token});
});

//Ver Informacion del Usuario
router.get('/profile', verifyToken, async (req, res, next) => {
    
    const user = await User.findById(req.userId, {password : 0});

    if(!user){
        return res.status(404).send('No user found');
    }

    res.json({auth: true, user});
});

module.exports = router;

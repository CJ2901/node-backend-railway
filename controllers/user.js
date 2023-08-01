
const {response, request} = require('express');
const Usuario = require('../models/usuario'); 
// Se usa la U mayúscula porque es un modelo, no una instancia de un usuario
const bcryptjs = require('bcryptjs');

const usersGet = async (req = request, res = response) => {
    
    // const {q, name = 'No name', apikey, page = 1, limit} = req.query;
    const { desde = 1, limite = 5 } = req.query;
    const query = {estado: true};

    const [total, data] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde-1))
            .limit(Number(limite))
    ]);

    // const data = await Usuario.find(query)
    //     .skip(Number(desde-1))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments(query);

    res.json({
        total,
        data
    });
}

const usersPost = async (req, res = response) => {
    
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        usuario
    });
}

const usersPut = async (req, res = response) => {
    
    const {id} = req.params;
    const {_id, correo, password, google, ...resto} = req.body;

    // TODO validar contra base de datos
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put API - usuariosPUT',
        usuario
    });
}

const usersDelete = async (req, res = response) => {

    const {id} = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    res.json({
        usuario    
    });
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controller',
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch,
}






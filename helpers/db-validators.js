
const Role = require('../models/role');
const usuario = require('../models/usuario');

const esRolvalido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
            throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

// Verificar si el correo existe
const emailExiste = async (correo = '') => {
    const existeEmail = await usuario.findOne({correo});
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya está registrado`);
    }
}

// Verificar si el usuario existe por id
const existeUsuarioPorId = async (id) => {
    const existeUsuario = await usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id '${id}' no existe`);
    }
}

module.exports = {
    esRolvalido,
    emailExiste,
    existeUsuarioPorId
}
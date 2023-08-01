const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        return res.status(400).json(errors);
    }
    next();
    // Next significa que se puede continuar con el siguiente middleware
}

module.exports = {
    validarCampos
}

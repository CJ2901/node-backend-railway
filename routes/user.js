const {Router} = require('express');
const { usersGet, usersPost, usersPut, usersDelete, usersPatch } = require('../controllers/user');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolvalido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();

        router.get('/', usersGet);

        router.post('/', [
                check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                check('password', 'El password debe tener más de 6 letras').isLength({min:6}),
                check('correo', 'El correo no es válido').isEmail(),
                check('correo').custom( emailExiste ),
                check('rol').custom( esRolvalido ),
                validarCampos        
        ] , usersPost);

        router.put('/:id', [
                check('id', 'No es un ID válido').isMongoId(),
                check('id').custom( existeUsuarioPorId ),
                check('rol').custom( esRolvalido ),
                validarCampos
        ], usersPut);

        router.patch('/', usersPatch);

        router.delete('/:id',[
                check('id', 'No es un ID válido').isMongoId(),
                check('id').custom( existeUsuarioPorId ),
                validarCampos
        ], usersDelete);

module.exports=router;
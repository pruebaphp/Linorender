import express from 'express'; 
import {formLogin,formRecuperarPassword, formCrearCuenta,registrarUsuario,confirmarCuenta,autenticarUsuario,eliminarUsuario,cerrarSesion} from '../controllers/authController.js'
import { tablaUsuarios,formEditarUsuario,editarUsuario } from '../controllers/adminController.js';
import protegerRuta from "../middlewares/protegerRuta.js";
import upload from '../middlewares/subirImagen.js';

const router = express.Router();

router.get('/',formLogin);
router.post('/',autenticarUsuario);
router.get('/recuperar-password',formRecuperarPassword);
router.get('/registrate',formCrearCuenta);
router.post('/registrate',registrarUsuario);
router.get('/confirmar-cuenta/:token',confirmarCuenta);
router.get('/usuarios',protegerRuta,tablaUsuarios);
router.get('/editar-usuario/:id',protegerRuta,formEditarUsuario)
router.post('/editar-usuario/:id',protegerRuta,upload.single('archivo'),editarUsuario)
router.get('/logout',cerrarSesion);
router.delete('/eliminar-usuario/:id',eliminarUsuario);

export default router;
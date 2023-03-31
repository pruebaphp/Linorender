
import { check,validationResult } from "express-validator";
import {Usuarios,Roles} from '../models/relaciones.js'
import bcrypt from 'bcrypt';
import {enviarEmailConfirmacion} from '../helpers/enviarEmail.js';
import { where } from "sequelize";
import { crearjwt } from "../helpers/tokens.js";


const formLogin = async(request,response)=>{
    response.render('auth/login',{
        nombrePagina: 'Iniciar Sesión',
    })
}

const autenticarUsuario = async(request,response)=>{
    await check('email').isEmail().withMessage('Ingrese un email correcto').run(request);
    await check('password').notEmpty().withMessage('Ingrese una contraseña').run(request);

    const resultado = validationResult(request);


    if(!resultado.isEmpty()){
        return response.render('auth/login',{
            nombrePagina:'Iniciar Sesión',
            errores: resultado.errors,
            data: request.body,
        })
    }

    const {email,password} = request.body;

    const usuario = await Usuarios.findOne({where:{email}});


    if(!usuario){
        return response.render('auth/login',{
            nombrePagina:'Iniciar Sesión',
            errores: [{msg:'Email o contraseña incorrectos'}],
            data: request.body,
        })

    }

    if(!bcrypt.compareSync(password,usuario.password)){
        return response.render('auth/login',{
            nombrePagina:'Iniciar Sesión',
            errores: [{msg:'Email o contraseña incorrectos'}],
            data: request.body,
        })
    }


    response.cookie("_jwt",crearjwt(usuario.idUsuario,usuario.nombre)).redirect('/usuarios');


}

const formRecuperarPassword = async(request,response)=>{
    response.render('auth/recuperar-password',{
        nombrePagina: 'Recupera tu contraseña',
    })
}

const formCrearCuenta = async(request,response)=>{
    response.render('auth/crear-cuenta',{
        nombrePagina: 'Registrate',
    })
}

const registrarUsuario = async(request,response)=>{
    await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(request);
    await check('email').isEmail().withMessage('Ingrese un email correcto').run(request);
    await check('password').notEmpty().withMessage('El password es obligatorio').run(request);
    await check('repeat').equals(request.body.password).withMessage('Las contraseñas no coinciden').run(request);

    const resultado = validationResult(request);

    if(!resultado.isEmpty()){
        return response.render('auth/crear-cuenta',{
            nombrePagina: 'Registrate',
            errores: resultado.errors,
            data: request.body,
        })
    }

    const {nombre,email,password} = request.body;

    const usuario = await Usuarios.create({
        nombre,
        email,
        password,
        rolid: 2,
    })

    await enviarEmailConfirmacion(usuario.email,usuario.nombre,usuario.token);

    response.render('template/correo-enviado',{
        nombrePagina: 'Correo enviado con éxito',
        correo: usuario.email
    })
}

const confirmarCuenta = async(request,response)=>{
    const {token} = request.params;
    console.log(token);

    if(!token){
        return response.redirect('/');
    }

    const usuario = await Usuarios.findOne({where:{token}})

    if(!usuario){
        return response.redirect('/');
    }

    usuario.token = '';
    usuario.estado = true;
    
    await usuario.save();

    response.render('template/mensaje-suceso',{
        nombrePagina:'Cuenta confirmada',
    })

}

const cerrarSesion = async(request,response)=>{
    response.clearCookie('_jwt').redirect('/');
}

const eliminarUsuario = async(request,response)=>{
    const {id} = request.params;
    console.log(id);

    const usuario = await Usuarios.findByPk(id);

    await usuario.destroy();

    response.json({
        "status":true,
        "msg":'Usuario eliminado con éxito.'
    })
}


export{
    formLogin,
    formRecuperarPassword,
    formCrearCuenta,
    registrarUsuario,
    confirmarCuenta,
    autenticarUsuario,
    eliminarUsuario,
    cerrarSesion,

}
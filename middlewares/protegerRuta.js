import { cookie } from "express-validator";
import { Usuarios } from "../models/relaciones.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path:'.env'})

const protegerRuta = async(request,response,next)=>{
    const {_jwt} = request.cookies;
    if(!_jwt){

        return response.redirect('/');
    }
 
    try {
       
        const decoded = jwt.verify(_jwt,process.env.SECRET_JWT);

        const usuario = await Usuarios.findOne({where:{
            idUsuario:decoded.id,
        }})

        if(!usuario){
            response.redirect('/');
        }else{
            request.usuario = usuario;
            next();
        }
        
    } catch (error) {
        console.log('OCURRIO UN ERROR EN EL TRY')
        response.clearCookie('_jwt').redirect('/');
    }



}

export default protegerRuta;
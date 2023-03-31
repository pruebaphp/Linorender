import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config({path:'.env'});

const tokenUsuario = ()=>{
    return Math.random().toString(32).slice(5)+"-"+Math.random().toString(32).slice(5)+"-"+Math.random().toString(32).slice(5)+"-"+Math.random().toString(32).slice(5);
}

const crearjwt = (id,nombre)=>{
    return jwt.sign({
        id,
        nombre,
    },process.env.SECRET_JWT,{expiresIn:'1d'});
}

export{
    tokenUsuario,
    crearjwt,
}
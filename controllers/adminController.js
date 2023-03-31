import { Usuarios,Roles } from "../models/relaciones.js"
import { check,validationResult } from "express-validator";
import fs from 'fs';
import bcrypt from 'bcrypt';

const tablaUsuarios = async(request,response)=>{

    const {pagina} = request.query;

    if(!pagina){
        return response.redirect('/usuarios?pagina=1');
    }

    const expresionRegular = /^[0-9]*$/;
    

    if(!expresionRegular.test(pagina)){
        return response.redirect('/usuarios?pagina=1');
    }

    const limit = 5;
    const offset = ((pagina*limit)-limit);

    const [usuarios,totalRegistros] = await Promise.all([
        Usuarios.findAll({limit,offset,include:[ {model: Roles}]}),
        Usuarios.count(),
    ])

    const paginas = Math.ceil(totalRegistros/limit);

    if(pagina>paginas){
        return response.redirect('/usuarios?pagina=1');
    }


    response.render('admin/usuarios.pug',{
        nombrePagina: 'Administración de usuarios',
        usuarios,
        paginas,
        paginaActual:pagina,

    })
}

const formEditarUsuario = async(request,response)=>{
    const {id} = request.params;
    if(!id){
        return response.redirect('/usuarios');
    }

    const usuario = await Usuarios.findOne({where:{idUsuario:id}});

    if(!usuario){
        return response.redirect('/usuarios');
    }

    const cargos = await Roles.findAll();

    response.render('admin/editar-usuario.pug',{
        nombrePagina: 'Editar usuario',
        data:usuario,
        imagen:usuario.imagen,
        cargos,
        rolid: usuario.rolid,
    })


    
}

const editarUsuario = async(request,response)=>{
    const {id} = request.params;
    if(!id){
        return response.redirect('/');
    }

    const usuario = await Usuarios.findOne({where:{idUsuario:id}});

    if(!usuario){
        return response.redirect('/');
    }

    //validar los errores

    await check('nombre').notEmpty().withMessage('El nombre no puede ir vacio').run(request);
    await check('email').isEmail().withMessage('Ingrese un email válido').run(request);
    
    const resultado = validationResult(request);

    if(request.file){
        if(request.file.mimetype=='image/jpeg' || request.file.mimetype=='image/png'){
            
        }else{
            fs.unlinkSync(`public/img/${request.file.filename}`)
            resultado.errors.push({msg:'Solo puede subir imagenes'})
        }
    }

    const cargos = await Roles.findAll();

    if(!resultado.isEmpty()){
        return response.render('admin/editar-usuario',{
            nombrePagina:'Editar Usuario',
            errores:resultado.errors,
            data: request.body,
            imagen: usuario.imagen,
            cargos,
            rolid: usuario.rolid,

        })
    }


    
    usuario.nombre = request.body.nombre;
    usuario.email = request.body.email;
    if(request.body.password){
        const passwordHash = await bcrypt.hash(request.body.password,10);
        usuario.password = passwordHash;
    }
    if(request.file){
        usuario.imagen = request.file.filename;
    }

    usuario.estado = request.body.estado;
    usuario.rolid = request.body.cargo;

    //console.log(usuario);
    console.log(request.body);
   
    const usuarioCreado = await usuario.save();
    console.log(usuarioCreado);
    response.redirect('/usuarios');
}

export{
    tablaUsuarios,
    formEditarUsuario,
    editarUsuario,
}
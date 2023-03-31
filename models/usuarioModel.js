import {DataTypes} from 'sequelize';
import db from '../config/db.js';
import bcrypt from 'bcrypt';
import { tokenUsuario } from '../helpers/tokens.js';

const Usuario = db.define('usuarios',{
    idUsuario:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true,
    },

    nombre:{
        type:DataTypes.STRING,
        allowNull:false,
    },

    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },

    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },

    imagen:{
        type:DataTypes.STRING,
        defaultValue: 'perfil_predefinido.jpg',
        allowNull:false,
    },

    token:{
        type:DataTypes.STRING,
        defaultValue: tokenUsuario(),
    },

    estado:{
        type:DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull:false,
    }



},{
    hooks:{
        beforeCreate: async function(usuario){
            usuario.password = await bcrypt.hash(usuario.password,10);
        }
    }
})

export default Usuario;
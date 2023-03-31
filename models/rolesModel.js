import {DataTypes} from 'sequelize';
import db from '../config/db.js';

const Roles = db.define('roles',{
    idRol:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement: true,
    },
    nombreRol:{
        type:DataTypes.STRING,
        allowNull:false,
    }
})

export default Roles;
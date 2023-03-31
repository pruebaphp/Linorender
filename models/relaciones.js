import Usuarios from "./usuarioModel.js";
import Roles from "./rolesModel.js";

Usuarios.belongsTo(Roles,{
    foreignKey: 'rolid'
});

export{
    Usuarios,
    Roles,
}
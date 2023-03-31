import '../models/relaciones.js';
import db from '../config/db.js'

const eliminar = ()=>{
    try {
        db.sync({force:true});
    } catch (error) {
        console.log('Ocurrio un error: '+error);
    }
}

eliminar();

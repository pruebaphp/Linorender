import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/indexRoutes.js';
import db from './config/db.js'
import './models/usuarioModel.js'

dotenv.config({path:'.env'});


const app = express();
//conectando a la db
try {
    db.sync();
} catch (error) {
    console.log('Ocurrio un error: '+error)
}
//asignando la carpeta publica
app.use(express.static('public'));
//asignando la carpeta de vistas
app.set('views','./views');
//asignar como motor gráfico a pug
app.set('view engine','pug');
//habilitando las cookies
app.use(cookieParser());
//para leer los formularios
app.use(express.urlencoded({extended:true}));
//asignando las rutas
app.use('/',indexRouter);


app.listen(process.env.PORT,()=>{
    console.log(`Aplicación funcionando en el puerto ${process.env.PORT}`);
})
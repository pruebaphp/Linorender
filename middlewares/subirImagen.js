import multer from "multer"
import { tokenUsuario } from "../helpers/tokens.js"
import path from 'path';

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/img')
    },

    filename: function(req,file,cb){
        cb(null,tokenUsuario()+path.extname(file.originalname))
    }
})

const upload = multer({storage})

export default upload;
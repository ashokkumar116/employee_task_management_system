const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/");
    },
    filename: function(req,file,cb){
        const ext = path.extname(file.originalname)
        const name = Date.now();
        cb(null,`${name}${ext}`)
    }
})


const upload = multer({
    storage,
    fileFilter:function(req,file,cb){
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if(extname && mimetype){
            return cb(null,true);
        }
        cb(new Error("Only PNG , JPEG , JPG is allowed"));
    },
    limits:{fileSize:5*1024*1024}
})


module.exports = upload;
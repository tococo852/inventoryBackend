const multer= require('multer')
/*const storage= multer.diskStorage({
    destination: function (req,file,cb){
        return cb(null, './public/images')
    },
    filename: function (req,file,cb){
        const date = Date.now()
        return cb (null, `${date}_${file.originalname}`)
    }
})
    */

const storage= multer.memoryStorage()

const upload = multer ({storage})

module.exports= upload
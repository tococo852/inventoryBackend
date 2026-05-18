const cloudinary = require('../cloudinaryConfig')
const {getPublicId}=require('../functions/getPublicId')


const cloudinaryUpload= async(req,res, next)=>{
    try{
            if(!req.file) return next()
            if(req.body.image_url && req.body.image_url!=''){
                await cloudinary.uploader.destroy(getPublicId(req.body.image_url))
            } 
            const upload = (fileBuffer)=>{
            return new Promise((resolve, reject)=>{
                const stream = cloudinary.uploader.upload_stream(
                    {folder: 'inventory'},
                    (error,result)=>{
                        if (result)resolve(result);
                        else reject(error)
                    }
                )
                stream.end(fileBuffer)
            })
        }
        const result = await upload(req.file.buffer)
        req.body.image_url= result.secure_url
        next()
    }

    catch(err){
        res.status(500).json({error:err.message})
    }



}


module.exports=cloudinaryUpload
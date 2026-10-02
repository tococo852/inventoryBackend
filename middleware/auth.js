const jwt = require('jsonwebtoken')

const auth =(req,res,next)=>{
    
    const token = req.headers.authorization?.split(' ')[1]

    //uncomment to disable auth check
    //if (!token) return next()
    //only use for local testing, never deploy with this uncommented


    if (!token) return res.status(401).json({message: 'credentials missing'})
    
    
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user=decode
        next()
    }
    catch {

        res.status(401).json({message: 'invalid credentials'})
    
    
    }
}

module.exports= auth
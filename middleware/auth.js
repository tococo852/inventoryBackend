const jwt = require('jsonwebtoken')

const auth =(req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1]
    console.log(token)
    if (!token) return res.status(401).json({message: 'credentials missing'})
    
    
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        next()
    }
    catch {
        res.status(401).json({message: 'invalid credentials'})
    
    
    }
}

module.exports= auth
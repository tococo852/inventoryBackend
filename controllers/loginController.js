const {users} = require('../db/queries')
const bcrypt = require('bcryptjs')
//const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken')
const loginController ={
     async login(req,res){
        const {password}= await users.getPassword(req.body.username)
        if (!password) return res.status(401).json({message: 'username or password incorrect'})
        const  match = await bcrypt.compare(req.body.password, password)
        if(match){
            const token = jwt.sign({id:req.body.username}, process.env.JWT_SECRET, {expiresIn: '1d'})
            res.json({token:token})

        } 
        else{
            res.status(401).json({message: 'username or password incorrect'})
        }
    }
}

 module.exports={loginController}
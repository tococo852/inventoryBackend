const {users} = require('../db/queries')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy;

const loginController ={
     async login(req,res){
        const {password}= await users.getPassword(req.body.username)
        const  match = await bcrypt.compare(req.body.password, password)
        if(match){
        res.json({token:'a token'})

        } 
        else{
            res.json({message: 'wrong information'})
        }
    }
}

 module.exports={loginController}
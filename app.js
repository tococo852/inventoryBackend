const express = require('express')
const app=express()
const categoriesRouter=require('./routers/categoriesRouter')
const itemsRouter=require('./routers/itemsRouter')
const measuresRouter= require('./routers/measuresRouter')
const catalogRouter= require('./routers/catalogRouter')
const loginRouter= require('./routers/loginRouter')
const cors = require('cors')
const path = require("node:path")
const { error } = require('node:console')
const passport = require("passport");
const  usersRouter  = require('./routers/usersRouter')
const LocalStrategy = require('passport-local').Strategy;
const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // max requests per IP
  message: 'Too many requests, please try again later.',
})
app.set('trust proxy', 1)
app.use(express.json())
app.use(cors())
app.use(limiter)

//app.use('/user',usersRouter)
app.use('/login',rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
}), loginRouter)
app.use('/items',itemsRouter)
app.use('/categories',categoriesRouter)
app.use('/measures', measuresRouter)
app.use('/catalog',catalogRouter)

const PORT = process.env.APP_PORT

app.listen(PORT, (error)=>{
    if(error){
        throw error
    }
    console.log(`App running on port ${PORT}`)
})

app.use ((err,req,res,next)=>{
    console.error(err)
    res.status(err.statusCode || 500).send(err.message)
})
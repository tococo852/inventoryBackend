const express = require('express')
const app=express()
const categoriesRouter=require('./routers/categoriesRouter')
const itemsRouter=require('./routers/itemsRouter')
const measuresRouter= require('./routers/measuresRouter')
const catalogRouter= require('./routers/catalogRouter')
const loginController= require('./controllers/loginController')
const cors = require('cors')
const path = require("node:path")
const { error } = require('node:console')
const passport = require("passport");
const { usersController } = require('./controllers/usersController')
const LocalStrategy = require('passport-local').Strategy;

app.use(express.json())

app.use(cors())
app.use('/items',itemsRouter)
app.use('/categories',categoriesRouter)
app.use('/measures', measuresRouter)
app.use('/catalog',catalogRouter)
app.use('/user',usersController)
app.use('/login', loginController)

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
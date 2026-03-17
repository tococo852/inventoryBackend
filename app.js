const express = require('express')
const app=express()
const categoriesRouter=require('./routers/categoriesRouter')
const itemsRouter=require('./routers/itemsRouter')

const path = require("node:path")
const { error } = require('node:console')

app.use(express.json())


app.use('/items',itemsRouter)
app.use('/categories',categoriesRouter)

const PORT = process.env.APP_PORT

app.listen(PORT, (error)=>{
    if(error){
        throw error
    }
    console.log(`App running on port ${PORT}`)
})

app.use ((err,req,res,next)=>{
    console.error(err)
    res.status(err.statusCode || 500).send(err.mesage)
})
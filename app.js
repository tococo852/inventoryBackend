const express = require('express')
const app=express()
const categoriesRouter=require('./routers/categoriesRouter')
const itemsRouter=require('./routers/itemsRouter')
const measuresRouter= require('./routers/measuresRouter')
const catalogRouter= require('./routers/catalogRouter')
const cors = require('cors')
const path = require("node:path")
const { error } = require('node:console')

app.use(express.json())

app.use(cors())
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
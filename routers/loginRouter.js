const {router, Router} = require('express')
const loginRouter=Router()
const {loginController} = require('../controllers/loginController')
loginRouter.post('',loginController.login)
module.exports= loginRouter
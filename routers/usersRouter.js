const {router, Router} = require('express')
const usersRouter=Router()
const {usersController} = require('../controllers/usersController')

usersController.post('/create', usersController.add)

module.exports = {usersController}
const {router, Router} = require('express')
const usersRouter=Router()
const {usersController} = require('../controllers/usersController')

usersRouter.post('/signup', usersController.add)

module.exports = usersRouter
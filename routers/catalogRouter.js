const Router= require('express')
const {catalogController}= require('../controllers/catalogController')
const catalogRouter= Router()

catalogRouter.get('/',catalogController.getCatalog)

module.exports=catalogRouter
const {Router}= require('express')
const categoriesRouter= Router()
const {categoriesController}= require('../controllers/categoriesController')
const auth = require( '../middleware/auth')

categoriesRouter.get('/',categoriesController.getAll)
categoriesRouter.get('/:category_id',categoriesController.getOne)
categoriesRouter.post('/',auth,categoriesController.add)
categoriesRouter.put('/:category_id',auth,categoriesController.update)
categoriesRouter.delete('/:category_id',auth,categoriesController.delete)




module.exports=categoriesRouter

const {Router}= require('express')
const categoriesRouter= Router()
const {categoriesController}= require('../controllers/categoriesController')

categoriesRouter.get('/',categoriesController.getAll)
categoriesRouter.get('/:category_id',categoriesController.getOne)
categoriesRouter.post('/',categoriesController.add)
categoriesRouter.put('/:category_id',categoriesController.update)
categoriesRouter.delete('/:category_id',categoriesController.delete)




module.exports=categoriesRouter

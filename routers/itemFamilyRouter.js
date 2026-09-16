const {Router}=require('express')
const itemsFamilyRouter=Router()
const {itemFamilyController}=require('../controllers/itemFamilyController')
const upload= require('../middleware/upload')
const auth = require( '../middleware/auth')
const cloudinaryUpload= require('../middleware/cloudinaryUpload')

itemsFamilyRouter.get('/',itemFamilyController.getAll)
itemsFamilyRouter.get('/:family_id',itemFamilyController.getOne)
itemsFamilyRouter.delete('/:family_id', itemFamilyController.delete)

itemsFamilyRouter.put('/categories/:family_id', itemFamilyController.addCategory)
itemsFamilyRouter.delete('/categories/:family_id', itemFamilyController.removeCategory)

module.exports=itemsFamilyRouter
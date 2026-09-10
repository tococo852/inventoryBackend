const {Router}=require('express')
const itemsFamilyRouter=Router()
const {itemFamilyController}=require('../controllers/itemFamilyController')
const upload= require('../middleware/upload')
const auth = require( '../middleware/auth')
const cloudinaryUpload= require('../middleware/cloudinaryUpload')

itemsFamilyRouter.get('/',itemFamilyController.getAll)

module.exports=itemsFamilyRouter
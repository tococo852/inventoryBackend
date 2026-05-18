const {Router}=require('express')
const itemsRouter=Router()
const {itemsController}=require('../controllers/itemsController')
const upload= require('../middleware/upload')
const auth = require( '../middleware/auth')
const cloudinaryUpload= require('../middleware/cloudinaryUpload')

itemsRouter.get('/',itemsController.getAll)
itemsRouter.get('/:item_id',itemsController.getOne)
itemsRouter.post('/',auth,upload.single('img_file'),cloudinaryUpload,itemsController.add)
itemsRouter.put('/:item_id',auth,upload.single('img_file'),cloudinaryUpload,auth,itemsController.update)
itemsRouter.delete('/:item_id',auth,itemsController.delete)


module.exports=itemsRouter
const {Router}=require('express')
const itemsRouter=Router()
const {itemsController}=require('../controllers/itemsController')
const upload= require('../middleware/upload')
const auth = require( '../middleware/auth')
const cloudinaryUpload= require('../middleware/cloudinaryUpload')

itemsRouter.get('/',itemsController.getAll)
itemsRouter.get('/:item_id',itemsController.getOne)
itemsRouter.post('/',auth,upload.single('img_file'),cloudinaryUpload,itemsController.add)
//itemsRouter.post('/',auth,itemsController.add)
//itemsRouter.put('/:item_id',auth,upload.single('img_file'),cloudinaryUpload,itemsController.update)
//updates a single item variant using its id
itemsRouter.put('/:item_id',auth,itemsController.update)
//update with variant lists, this is a whole item family, or a single item
//single items are represented by their item family
itemsRouter.put('/family/:family_id',auth,itemsController.updateFamily)
itemsRouter.delete('/:item_id',auth,itemsController.delete)


module.exports=itemsRouter
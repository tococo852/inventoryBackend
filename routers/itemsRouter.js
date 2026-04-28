const {Router}=require('express')
const itemsRouter=Router()
const {itemsController}=require('../controllers/itemsController')
const auth = require( '../middleware/auth')

itemsRouter.get('/',auth,itemsController.getAll)
itemsRouter.get('/:item_id',itemsController.getOne)
itemsRouter.post('/',auth,itemsController.add)
itemsRouter.put('/:item_id',auth,itemsController.update)
itemsRouter.delete('/:items_id',auth,itemsController.delete)


module.exports=itemsRouter
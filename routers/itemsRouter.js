const {Router}=require('express')
const itemsRouter=Router()
const {itemsController}=require('../controllers/itemsController')

itemsRouter.get('/',itemsController.getAll)
itemsRouter.get(':item_id',itemsController.getOne)
itemsRouter.post('/',itemsController.add)
itemsRouter.put('/:item_id',itemsController.update)
itemsRouter.delete('/:items_id',itemsController.delete)


module.exports=itemsRouter
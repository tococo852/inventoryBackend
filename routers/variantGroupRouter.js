const { Router } = require('express')
const variantGroupRouter = Router()
const { variantGroupController } = require('../controllers/variantGroupController')
const auth = require( '../middleware/auth')

variantGroupRouter.get('/', variantGroupController.getAll)
variantGroupRouter.get('/:variantGroup_id', variantGroupController.getOne)
variantGroupRouter.post('/',auth, variantGroupController.add)
variantGroupRouter.put('/:variantGroup_id', auth,variantGroupController.update)
variantGroupRouter.delete('/:variantGroup_id', auth,variantGroupController.delete)

module.exports = variantGroupRouter
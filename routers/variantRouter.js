const { Router } = require('express')
const variantRouter = Router()
const { variantController } = require('../controllers/variantController')
const auth = require( '../middleware/auth')

variantRouter.get('/', variantController.getAll)
variantRouter.get('/:variant_id', variantController.getOne)
variantRouter.post('/:parent_id', variantController.add)
variantRouter.put('/:variant_id', variantController.update)
variantRouter.delete('/:variant_id', variantController.delete)

module.exports = variantRouter
const { Router } = require('express')
const measuresRouter = Router()
const { measuresController } = require('../controllers/measuresController')
const auth = require( '../middleware/auth')

measuresRouter.get('/', measuresController.getAll)
measuresRouter.get('/:measure_id', measuresController.getOne)
measuresRouter.post('/',auth, measuresController.add)
measuresRouter.put('/:measure_id',auth, measuresController.update)
measuresRouter.delete('/:measure_id',auth, measuresController.delete)

module.exports = measuresRouter
const { Router } = require('express')
const measuresRouter = Router()
const { measuresController } = require('../controllers/measuresController')

measuresRouter.get('/', measuresController.getAll)
measuresRouter.get('/:measure_id', measuresController.getOne)
measuresRouter.post('/', measuresController.add)
measuresRouter.put('/:measure_id', measuresController.update)
measuresRouter.delete('/:measure_id', measuresController.delete)

module.exports = measuresRouter
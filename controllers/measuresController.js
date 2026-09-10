const { measures } = require('../db/queries')
const {checkId} = require('../functions/checkId')

const measuresController = {
  async getAll(req, res) {
    const data = await measures.getAll()
    res.json(data)
  },
  async getOne(req, res) {
    const { measure_id } = req.params
    const id = checkId(measure_id)
    const data = await measures.getOne(id)
    res.json(data)
  },
  async update(req, res) {
    const { measure_id } = req.params
    const { measure } = req.body
    const id = checkId(measure_id)

    await measures.editName(id, measure)
    res.json({ message: "Measure Updated" })
  },
  async add(req, res) {
    const { measure } = req.body
    await measures.add(measure)
    res.json({ message: "Measure Added" })
  },
  async delete(req, res) {
    const { measure_id } = req.params
    const id = checkId(measure_id)

    await measures.delete(id)
    res.json({ message: "Measure Deleted" })
  }
}

module.exports = { measuresController }
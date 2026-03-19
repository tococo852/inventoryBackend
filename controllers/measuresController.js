const { measures } = require('../db/queries')

const measuresController = {
  async getAll(req, res) {
    const data = await measures.getAll()
    res.json(data)
  },
  async getOne(req, res) {
    const { measure_id } = req.params
    const data = await measures.getOne(measure_id)
    res.json(data)
  },
  async update(req, res) {
    const { measure_id } = req.params
    const { measure } = req.body
    await measures.editName(measure_id, measure)
    res.json({ message: "Measure Updated" })
  },
  async add(req, res) {
    const { measure } = req.body
    await measures.add(measure)
    res.json({ message: "Measure Added" })
  },
  async delete(req, res) {
    const { measure_id } = req.params
    await measures.delete(measure_id)
    res.json({ message: "Measure Deleted" })
  }
}

module.exports = { measuresController }
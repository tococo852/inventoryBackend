const { variant } = require('../db/queries')
const {checkId} = require('../functions/checkId')

const variantController = {
  async getAll(req, res) {
    const data = await variant.getAll()
    res.json(data)
  },
  async getOne(req, res) {
    const { variant_id } = req.params
    const data = await variant.getOne(variant_id)
    res.json(data)
  },
  async update(req, res) {
    const { variant_id } = req.params
    const id = checkId(variant_id)
    const { name } = req.body
    await variant.editName(id, name)
    res.json({ message: "variant Updated" })
  },
  async add(req, res) {
    const {parent_id}= req.params
    const id = checkId(parent_id)
    const { name } = req.body
    await variant.add(name, id)
    res.json({ message: "variant Added" })
  },
  async delete(req, res) {
    const { variant_id } = req.params
    const id = checkId(variant_id)
    await variant.delete(id)
    res.json({ message: "variant Deleted" })
  }
}

module.exports = { variantController }
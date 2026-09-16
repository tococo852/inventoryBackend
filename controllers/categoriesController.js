const { categories } = require('../db/queries')
const {checkId} = require('../functions/checkId')

const categoriesController = {
  async getAll(req, res) {
    const data = await categories.getAll()
    res.json(data)
  },
  async getOne(req, res) {
    const {category_id}= req.params
    const id = checkId(category_id)
    const data = await categories.getOne(id)
    res.json(data)
  },
  async update(req, res) {
    const { category_id } = req.params
    const id = checkId(category_id)
    const { name } = req.body
    await categories.editName(id, name)
    res.json({ message: "Name Updated" })
  },
  async add(req, res) {
    const { name } = req.body
    await categories.add(name)
    res.json({ message: "Category Added" })
  },
  async delete(req, res) {
    const { category_id } = req.params
    const id = checkId(category_id)

    await categories.delete(id)
    res.json({ message: "Category Deleted" })
  }
}

module.exports = { categoriesController }
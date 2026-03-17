const { categories } = require('../db/queries')

const categoriesController = {
  async getAll(req, res) {
    const data = await categories.getAll()
    res.json(data)
  },
  async getOne(req, res) {
    const {category_id}= req.params
    const data = await categories.getOne(category_id)
    res.json(data)
  },
  async update(req, res) {
    const { category_id } = req.params
    const { name } = req.body
    await categories.editName(category_id, name)
    res.json({ message: "Name Updated" })
  },
  async add(req, res) {
    const { name } = req.body
    await categories.add(name)
    res.json({ message: "Category Added" })
  },
  async delete(req, res) {
    const { category_id } = req.params
    await categories.delete(category_id)
    res.json({ message: "Category Deleted" })
  }
}

module.exports = { categoriesController }
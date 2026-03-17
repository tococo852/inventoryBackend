const {items} = require('../db/queries')

const itemsController = {
  async getAll(req, res) {
    const data = await items.getAll()
    res.json(data)
  },  
  async getOne(req, res) {
    const {item_id}=req.params
    const data = await items.getOne(item_id)
    res.json(data)
  },
  async add(req, res) {
    const { name, barcode, category_id } = req.body
    await items.add(name, category_id, barcode)
    res.json({ message: "Item added" })
  },
  async update(req, res) {
    const { item_id } = req.params
    const { name, category_id, barcode } = req.body
    await items.update(item_id, name, category_id, barcode)
    res.json({ message: "Item updated" })
  },
  async delete(req, res) {
    const { item_id } = req.params
    await items.delete(item_id)
    res.json({ message: "Item deleted" })
  }
}

module.exports = { itemsController }
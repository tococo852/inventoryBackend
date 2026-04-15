const {items} = require('../db/queries')
const {EAN13BarcodeGen} = require('../functions/barcodeGeneration')

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
  const { name, barcode, category_id, price, description, image_url, quantity, stock, measure_id } = req.body
  
  await items.add(name, category_id, barcode, price, description, image_url, quantity, stock, measure_id)
  res.json({ message: "Item added" })
    },
  async update(req, res) {
    const { item_id } = req.params
    const { name, category_id, barcode, price, description, image_url, quantity, stock, measure_id } = req.body

    
    const barcodeUpdate = barcode===null ? EAN13BarcodeGen('223',category_id,item_id):barcode
    console.log(barcodeUpdate)

    await items.update(item_id, name, category_id, barcodeUpdate, price, description, image_url, quantity, stock, measure_id)
    res.json({ message: "Item updated" })
    },
  async delete(req, res) {
    const { item_id } = req.params
    await items.delete(item_id)
    res.json({ message: "Item deleted" })
  }
}

module.exports = { itemsController }
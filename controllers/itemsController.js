const {items,itemFamily} = require('../db/queries')
const {EAN13BarcodeGen} = require('../functions/barcodeGeneration')
const {getPublicId}=require('../functions/getPublicId')
const cloudinary = require('../cloudinaryConfig')
const {checkId} = require('../functions/checkId')

const itemsController = {
  async getAll(req, res) {
    const data = await items.getAll()
    res.json(data)
  },
  async getOne(req, res) {
    const {item_id}=req.params
    const id = checkId(item_id)
    const data = await items.getOne(id)
    res.json(data)
  },


  /*
  
Category =
'[{"id":1,"name":"bolsa"},{"id":4,"name":"plumavit"}]'
image_url =
''
name =
'Nuevo item y variantes'
variant_list =

  

  */
  async add(req, res) {
    console.log('request arrived')
    const { name, image_url, measure_id,variant_list, Category, description} = req.body
    await items.add(name, description, image_url, Number(measure_id),JSON.parse(variant_list), JSON.parse(Category))
    res.json({ message: "Item added" })
    },
  async updateFamily(req, res) {
    const {id}= req.params
    const family_id = checkId(id)
    const { name, category_id, barcode, price, description, image_url, quantity, stock, measure_id,variant_list } = req.body
    await items.updateFamily(name, category_id, barcode, price, description, image_url, quantity, stock, measure_id, family_id,variant_list)
    res.json({ message: "Item updated" })
    },
    
    async update(req, res) {
    const { item_id } = req.params
    const id = checkId(item_id)
    const { name, category_id, barcode, price, description, image_url, quantity, stock, measure_id,variant_list,family_id } = req.body
    const barcodeUpdate = !barcode ? EAN13BarcodeGen('223', category_id, item_id) : barcode
    await items.update(id, name, category_id, barcodeUpdate, price, description, image_url, quantity, stock, measure_id, family_id,variant_list)
    res.json({ message: "Item updated" })
    },
  async delete(req, res) {
    const { item_id } = req.params
    const id = checkId(item_id)
    const data = await items.getOne(id)
    //const url = data.image_url
    //if (url && url !='') await cloudinary.uploader.destroy(getPublicId(url))
    await items.delete(id)
    res.json({ message: "Item deleted" })
  }
}

module.exports = { itemsController }
const { itemFamily } = require('../db/queries')
const {checkId} = require('../functions/checkId')

const itemFamilyController = {
  async getAll(req, res) {
    const data = await itemFamily.getAll()
    res.json(data)
  },
  async getOne (req,res){
    const {family_id}= req.params
    const id= checkId(family_id)
    const data=await itemFamily.getOne(id)
    res.json(data)
  },
  async delete(req, res) {
    const { family_id } = req.params
    const id = checkId(family_id)
    const data = await itemFamily.getOne(id)
    //const url = data.image_url
    //if (url && url !='') await cloudinary.uploader.destroy(getPublicId(url))
    await itemFamily.delete(id)
    res.json({ message: "Item Family and Descendants deleted" })
  }
}

module.exports = { itemFamilyController }
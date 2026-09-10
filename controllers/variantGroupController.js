const { variantGroup } = require('../db/queries')
const {checkId} = require('../functions/checkId')

const variantGroupController = {
  async getAll(req, res) {
    const data = await variantGroup.getAll()
    res.json(data)
  },
  async getOne(req, res) {
    const { variantGroup_id } = req.params
    const id = checkId(variantGroup_id)
    const data = await variantGroup.getOne(id)
    res.json(data)
    

  },
  async update(req, res) {
    const { variantGroup_id } = req.params
    const { name } = req.body
    const id = checkId(variantGroup_id)
    await variantGroup.update(id, name)
    res.json({ message: "variantGroup Updated" })
  },
  async add(req, res) {
    const { name } = req.body
    await variantGroup.add(name)
    res.json({ message: "variantGroup Added" })
  },
  async delete(req, res) {
    const { variantGroup_id } = req.params
    const id = checkId(variantGroup_id)

    await variantGroup.delete(id)
    res.json({ message: "variantGroup Deleted" })
  }
}

module.exports = { variantGroupController }
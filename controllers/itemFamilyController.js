const { itemFamily } = require('../db/queries')
const {checkId} = require('../functions/checkId')

const itemFamilyController = {
  async getAll(req, res) {
    const data = await itemFamily.getAll()
    res.json(data)
  }
}

module.exports = { itemFamilyController }
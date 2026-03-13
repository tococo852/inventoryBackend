const pool = require('./pool')


const items={
    async getAll(){},
    async updateBarcode(item_id, barcode){},
    async updateName(item_id, name){},
    async updateCategory(item_id,category_id){},
    async delete(item_id){}
}


const categories = {
  async getAll() {},
  async add(categoryName) {},
  async editName(category_id, name) {},
  async delete(category_id) {}
}

module.exports={items,categories}
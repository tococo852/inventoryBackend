const pool = require('./pool')


const items={
    async getAll(){
        const {rows}= await pool.query('SELECT * FROM items')
        return rows
    },

    async add(name, category_id, barcode){
        await pool.query('INSERT INTO items (name, category_id, barcode) VALUES ( $1,$2,$3)',[name,category_id,barcode] )
    }
    ,
    async updateBarcode(item_id, barcode){
        await pool.query('UPDATE items SET barcode = $1 where id = $2',[barcode, item_id])
    },
    async updateName(item_id, name){
        await pool.query ('UPDATE items SET name = $1 where id = $2',[name, item_id])
    },
    async updateCategory(item_id,category_id){
         await pool.query ('UPDATE items SET category_id = $1 where id = $2', [category_id, item_id])
    },
    async delete(item_id){
        await pool.query('DELETE FROM items WHERE id=$1', [item_id])


    }
}


const categories = {
  async getAll() {},
  async add(categoryName) {},
  async editName(category_id, name) {},
  async delete(category_id) {}
}

module.exports={items,categories}
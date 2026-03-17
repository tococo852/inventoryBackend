const pool = require('./pool')


const items = {
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM items')
    return rows
  },
  async getOne(item_id){
    const {rows}= await pool.query('SELECT * FROM items WHERE id = $1',[item_id])
    return rows
  }
  ,
  async add(name, category_id, barcode) {
    await pool.query(
      'INSERT INTO items (name, category_id, barcode) VALUES ($1, $2, $3)',
      [name, category_id, barcode]
    )
  },
  async update(item_id, name, category_id, barcode) {
    await pool.query(
      'UPDATE items SET name = $1, category_id = $2, barcode = $3 WHERE id = $4',
      [name, category_id, barcode, item_id]
    )
  },
  async delete(item_id) {
    await pool.query('DELETE FROM items WHERE id = $1', [item_id])
  }
}

const categories = {
  async getAll() {
    const {rows} = await pool.query ('SELECT * FROM categories')
    return rows
  },
  async getOne(category_id) {
    const {rows} = await pool.query ('SELECT * FROM categories WHERE id = $1',[category_id])
    return rows
  },
  async add(categoryName) {
    await pool.query('INSERT INTO categories (name) VALUES ($1)',[categoryName])
  },
  async editName(category_id, name) {
    await pool.query('UPDATE categories SET name = $1 WHERE id = $2', [name,category_id])
  },
  async delete(category_id) {
    await pool.query('DELETE FROM categories WHERE id = $1', [category_id])
  }
}

module.exports={items,categories}
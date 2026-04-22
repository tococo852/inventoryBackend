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
  async add(name, category_id, barcode, price, description, image_url, quantity, stock, measure_id) {
  await pool.query(
    'INSERT INTO items (name, category_id, barcode, price, description, image_url, quantity, stock, measure_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    [name, category_id, barcode, price, description, image_url, quantity, stock, measure_id]
  )
    },
    async update(item_id, name, category_id, barcode, price, description, image_url, quantity, stock, measure_id) {
    await pool.query(
        'UPDATE items SET name=$1, category_id=$2, barcode=$3, price=$4, description=$5, image_url=$6, quantity=$7, stock=$8, measure_id=$9 WHERE id=$10',
        [name, category_id, barcode, price, description, image_url, quantity, stock, measure_id, item_id]
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

const measures = {
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM measures')
    return rows
  },
  async getOne(measure_id) {
    const { rows } = await pool.query('SELECT * FROM measures WHERE id = $1', [measure_id])
    return rows
  },
  async add(measure) {
    await pool.query('INSERT INTO measures (measure) VALUES ($1)', [measure])
  },
  async editName(measure_id, measure) {
    await pool.query('UPDATE measures SET measure = $1 WHERE id = $2', [measure, measure_id])
  },
  async delete(measure_id) {
    await pool.query('DELETE FROM measures WHERE id = $1', [measure_id])
  }
}

const catalog ={
    async getCatalog(){
        const {rows}= await pool.query(`
            SELECT items.id, items.name, categories.name as category, barcode, price, description, image_url, quantity, stock, measures.measure as measure FROM items
            LEFT JOIN categories ON categories.id=items.category_id
            LEFT JOIN measures ON measures.id=items.measure_id
            `)
        return rows
    }
}

const users = {
  async getAll() {
    const {rows} = await pool.query ('SELECT * FROM users')
    return rows
  },
  async getPassword(username) {
    const {rows} = await pool.query ('SELECT password FROM users WHERE username = LOWER( $1 )',[username])
    return rows
  },
  /*async getUser(username) {
    const {rows} = await pool.query ('SELECT username FROM users WHERE username = LOWER( $1 )',[username])
    return rows
  },*/
  async add(username,password) {
    await pool.query('INSERT INTO users (username,password) VALUES (LOWER($1), $2)',[username,password])
  },
  async editPassword(password,username) {
    await pool.query('UPDATE users SET password = $1 WHERE username=LOWER($2)', [password,username])
  },
  async delete(username) {
    await pool.query('DELETE FROM users WHERE username = LOWER($1)', [username])
  }
}


module.exports={items,categories,measures, catalog,users}
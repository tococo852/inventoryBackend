const {users} = require ('../db/queries')

const usersController = {
  async getAll(req, res) {
    const data = await users.getAll()
    res.json(data)
  },
  async getPassword(req, res) {
    const { username } = req.body
    const data = await users.getPassword(username)
    res.json(data)
  },
  async update(req, res) {
    const { username, password } = req.body
    await users.editPassword(password,username)
    res.json({ message: "password Updated" })
  },
  async add(req, res) {
    const { username,password } = req.body
    await users.add(username,password)
    
    res.json({ message: "user Added" })
  },
  async delete(req, res) {
    const { username } = req.body
    await users.delete(username)
    res.json({ message: "user Deleted" })
  }
}

module.exports = { usersController }
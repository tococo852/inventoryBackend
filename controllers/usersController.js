const {users} = require ('../db/queries')
const bcrypt = require("bcryptjs");

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
    await users.editPassword(username,password)
    res.json({ message: "password Updated" })
  },
  async add(req, res) {
    const { username,password } = req.body
    try{
      const hashedPassword = await bcrypt.hash(password,10)
      await users.add(username,hashedPassword)
      res.json({ message: "user Added" })



    } catch(error){
      console.log(error)
      next(error)
    }
    
  },
  async delete(req, res) {
    const { username } = req.body
    await users.delete(username)
    res.json({ message: "user Deleted" })
  }
}

module.exports = { usersController }
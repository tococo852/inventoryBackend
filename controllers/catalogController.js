const {catalog} = require('../db/queries')
const {categories} = require('../db/queries')

const catalogController={

    async getCatalog(req,res){
        const inventory= await catalog.getCatalog()
        const inventoryClean= inventory.map(row=>({
            ...row,
            category:row.category?[row.category]:[]
        }))

        const category=await categories.getAll()
        res.json({inventory:inventoryClean,categories:category})
    }

}

module.exports= {catalogController}
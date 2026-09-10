//const pool = require('./pool')
const { cartesianProduct } = require('../functions/cartesianProduct');
const { prisma } = require('../lib/prisma');



const items = {
  async getAll() {
    const items = await prisma.item.findMany()
    return items
  },
  async getOne(item_id){
    const item = await prisma.item.findUnique({
      where:{
        id:item_id
      }
    })
    return item
  }
  ,
  //variantlist
  /*expected shape: 
  variant_list : [
    {variant_parent: variant_family_id, varint_choices:[variant_id,variant_id]},
    ...,
    {variant_family_id, [variant_id,variant_id]}
    ]

  if there is a variant list, run a map on it, using the data from the map
  run a prisma create with connect to the acording id,
  the variant list mapping should be made in a way it can create all viable combinations



const recList=( listoflist, c=0, currId=[], totalId=[])=>{

  if (c>=listoflist.length){
    totalId.push([...currId])
    return
  }

  for (let i=0; i < listoflist[c].length; i++) {
    currId.push(listoflist[c][i])
    recList(listoflist,c+1, currId,totalId)
    currId.pop()
    
  }

  return totalId
}
  */

 


async add(name, barcode, price, description, image_url, quantity, stock, measure_id, family_id=null, variant_list=null) {
  if (!family_id) {
    const newFamily = await prisma.itemFamily.create({
      data: { name: `${name} y Variaciones`, image_url }
    });
    family_id = newFamily.id;
  }

  const itemData = { name, barcode, description, image_url, quantity, stock, measure_id, price};

  if (variant_list) {
    const existingItems = await prisma.item.findMany({
      where: { family_id },
      include: { Variant: true }
    });

    const existingSignatures = new Set(
      existingItems.map(item =>
        item.Variant.map(v => v.id).sort().join('-')
      )
    );

    const listOfLists = variant_list.map(v => v.variant_choices);
    const combinations = cartesianProduct(listOfLists);

    const newCombinations = combinations.filter(combi => {
      const signature = [...combi].sort().join('-');
      return !existingSignatures.has(signature);
    });

    await Promise.all(
      newCombinations.map(combi =>
        prisma.item.create({
          data: {
            ...itemData,
            Variant: {
              connect: combi.map(variant_id => ({ id: variant_id }))
            }
          }
        })
      )
    );

    return {
      message: `added ${newCombinations.length} variant(s), skipped ${combinations.length - newCombinations.length} already existing`
    };
  } else {
    await prisma.item.create({ data: itemData });
  }

  return { message: 'added' };
},

    async update(item_id, name, category_id, barcode, price, description, image_url, quantity, stock, measure_id, family_id) {
      const itemData= { name, category_id, barcode, price, description, image_url, quantity, stock, measure_id, family_id}

      await prisma.item.update({
        where: {
          id: item_id
        },
        data: itemData
      })
    return {message: 'updated'}
    },

  async delete(item_id) {
    const deletedProduct = prisma.item.delete({
      where:{
        id:item_id
      }
    })
   return deletedProduct
  }
}


const categories = {
  async getAll() {
    const category = await prisma.category.findMany()
    return category
  },

  async getOne(category_id) {
    const SingleCategory = await prisma.category.findUnique({
      where:{
        id:category_id
      }
    })
    return SingleCategory
  },

  async add(categoryName) {

    await prisma.category.create({
      data:{name:categoryName}
    })
    return {message: 'added'}

  },
  async editName(category_id, name) {
    await prisma.item.update({
        where: {
          id: category_id
        },
        data: {name}
      })
      return {message:'edited'}
  }, 

  async delete(category_id) {
    const deletedCategory = prisma.category.delete({
      where:{
        id:category_id
      }
    })
   return deletedCategory
  }
}

const measures = {

async getAll() {
    const unit = await prisma.measureUnit.findMany()
    return unit
  },

  async getOne(measure_id) {
    const singleMeasure = await prisma.measureUnit.findUnique({
      where:{
        id:measure_id
      }
    })
    return singleMeasure
  },

  async add(measure) {

    await prisma.measureUnit.create({
      data:{name:measure}
    })
    return {message: 'added'}

  },
  async editName(measure_id, measure) {
    await prisma.measureUnit.update({
        where: {
          id: measure_id
        },
        data: {measure}
      })

      return {message:'edited'}
  }, 

  async delete(measure_id) {
    const deletedMeasure = prisma.measureUnit.delete({
      where:{
        id:measure_id
      }
    })
   return deletedMeasure
  }
}

const catalog ={
    //new variant, now i only want my catalog to have the item families and their respective catagories
    async getCatalogF(){

      const catalog = await prisma.itemFamily.findMany({
        include:{
          _count:{
            select:{
              Item:true
            }
          },
          ItemFamily_Category:{
            select:{
              Category:{
                select:{
                  id:true,
                  name:true
                }
              }
            }
          }
        }
      })
      return catalog

    }

    
}

const variantGroup={
  async add(name){
    await prisma.variantGroup.create({data:{name}})

  },
  async getOne(id){

    const variant_group= await prisma.variantGroup.findUnique({
      where:{
        id
      },
      include:{
        Variant:{
          select:{
            id:true,
            name:true
            
          }
        }
      }
    })
    return variant_group

  },
  async getAll (){
    const allGroups = await prisma.variantGroup.findMany({include:{Variant:true}})
    return allGroups
  },
  async update (id, name){
    await prisma.variantGroup.update({where:{id},data:{name}})

  },
  //i feel deleting variant groups could have terrible consequences
  async delete (id){
    await prisma.variantGroup.delete({where:{id}})

  }

}

const variant={
async add(name,parent_id){
    return await prisma.variant.create({
      data:{name, 
        VariantGroup:{
        connect: {id:parent_id}
    }}})

  },
  async getOne(id){

    const variant_group= await prisma.variant.findUnique({
      where:{
        id
      }
    })
    return variant_group

  },
  async getAll (){
    const allGroups = await prisma.variant.findMany()
    return allGroups
  },
  async update (id, name){
    await prisma.variant.update({where:{id},data:{name}})

  },
  //i feel deleting variant groups could have terrible consequences
  async delete (id){
    await prisma.variant.delete({where:{id}})

  }
}

const itemFamily={
  async addCategory(family_id,category_id){
    await prisma.itemFamily.update({where:{id:family_id},data:{ItemFamily_Category:{
      connect:{id:category_id}
    }}})
  },

  async getAll(){
    const itemFamilies= await prisma.itemFamily.findMany()
    return itemFamilies
      
  }

}

const users = {

  async getAll() {
    const users = await prisma.user.findMany()
    return users
  },

  async getOne(measure_id) {
    const singleMeasure = await prisma.measureUnit.findUnique({
      where:{
        id:measure_id
      }
    })
    return singleMeasure
  },

  async getPassword(username) {
    const password= await prisma.user.findUnique({
      where:{username},
      select:{password:true}
    })
    return password

  },

  async add(username,password) {

    await prisma.user.create({
      data:{username, password}
    })
    return {message: 'added'}

  },

  async editPassword(username,password) {
    await prisma.user.update({
        where: {
          username
        },
        data: {password}
      })
      return {message:'edited'}
  }, 

  async delete(username) {
    const deletedMeasure = prisma.user.delete({
      where:{
        username
      }
    })
   return deletedMeasure
  }
  /*async getUser(username) {
    const {rows} = await pool.query ('SELECT username FROM users WHERE username = LOWER( $1 )',[username])
    return rows
  },*/

}


/*
takes a list of list,
inteded to be a list of different variants groups, we dont really care which groups
is just important they are separed by a list

[[12,14,15],//color group ids
[22,23,24],//size group ids
[45,43,34]//pattern group ids]

so this will generate a cartesian product of all combinations possible for each item
meaning each memeber of the generated list is a new item to be created and which relationships it will have
are indicated by the list itself, so if i get 12,24,45 we have 1 new item, which has
to be linked via junction table to its corresponding properties, we will also know from those relationships
which variant group is each one




for updating is best to just use directly the item id



////

controllers to tests in base of changes done to queries

test everything on items

*/

module.exports={items,categories,measures, catalog,users,variant,variantGroup,itemFamily}
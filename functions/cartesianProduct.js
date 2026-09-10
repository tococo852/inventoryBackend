/*
given a list of lists, generates the cartesian product of it ie:
[[2,7],[4,5],[3,6]]

2 4 3
2 5 3
2 4 6
2 5 6
...
etc



*/
const cartesianProduct=( listoflist, c=0, currId=[], totalId=[])=>{

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

module.exports= {cartesianProduct}


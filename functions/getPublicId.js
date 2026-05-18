const getPublicId = (url) => {
  
  const parts = url.split('/')
  const folder = parts[parts.length - 2]
  const filename = parts[parts.length - 1].split('.')[0] // remove extension
  return `${folder}/${filename}`
}

module.exports= {getPublicId}
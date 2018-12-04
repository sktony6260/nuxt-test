const path = require('path');
const imgTypeToExtensionMap = {
  'image/jpeg':'.jpg',
  'image/bmp':'.bmp',
  'image/gif':'.gif',
  'image/png': '.png'
}
const uploadPath = path.resolve(__dirname,'../static/img-uploads');
const imgOption = {
  fit:{
    0:'cover',
    1:'contain',
    2:'fill',
    3:'inside',
    4:'outside'
  }
}
module.exports = {
  imgTypeToExtensionMap,
  uploadPath,
  imgOption
};
const sharp = require('sharp');
const path = require('path');
const {imgOption,uploadPath} = require('./config');
const imgOptimize = require('./imgOptimize');
const downimg = require('./downloadImg');
const temp = require('fs-temp');
// const jclrz = require('json-colorz');
// const overlayPath = path.resolve(__dirname, '../static/zhoumei.png');
// const outPut = path.resolve(__dirname, '../static/output.jpg');
// const outPut = (async () => {
//   const outPut = await sharp(imgPath).metadata();
//   console.log(outPut);
// })();
const watermark = new Buffer(`<svg>
    <rect x="0" y="0" width="100" height="100" fill="#000" />
    <text x="10" y="76" font-size="40" fill="#fff">fuck u</text>
  </svg>`)
const defaultOptions = {
    width:200,
    height:200,
    fit:imgOption.fit[0],//cover,contain,fill,inside,outside
    position:'centre',//top, right top, right, right bottom, bottom, left bottom, left, left top
    jpgQuality:80,//质量，整数1-100(可选，默认80)
    pngQuality:9, //zlib压缩级别，0-9(可选，默认9)
    webpQuality:80,//质量，整数1-100(可选，默认80),
    background:'#fff',//color颜色,
    withoutEnlargement:true
  };
const imgInputAsRectangle = path.resolve(__dirname, '../static/rectangle.jpg');
const imgInputAsSquare = path.resolve(__dirname, '../static/square.jpg');
const png = path.join(uploadPath,'shit.png');
const imgList = [imgInputAsRectangle,imgInputAsSquare];
const dest = temp.mkdirSync();
const optss = new imgOptimize({
  width:100,
  height:50,
  format:'jpg',
  fit:'contain',
});
optss.toFile(imgInputAsRectangle).then(res => {
  console.log(res);
});
const getImgAndSave  = async () => {
  const dest = path.join(uploadPath,'shit.png')
  await downimg('http://nodejs999.com/images/run2.png',dest);
  setTimeout(() => {
    optss.toFile(dest).then(res => {
      console.log(res);
    });
  },1000);
}
// getImgAndSave();
// const exportImg = async () => {
//   for (var i = imgList.length - 1; i >= 0; i--) {
//     await optimize.toFile(imgList[i]);
//   }
// }
// exportImg();
// 
// (async () => {
//   const originInfo = await sharp(imgPath).metadata();
//   console.log(originInfo);
//   const tCut = (originInfo.height-1000)/2;
//   const lCut = (originInfo.width-1000)/2;
//   sharp(imgPath)
//   // .extract({
//   //   top:tCut,
//   //   left:lCut,
//   //   width:originInfo.width - lCut,
//   //   height:originInfo.height - tCut
//   // }).
//   // resize(originInfo.width - lCut,originInfo.height - tCut)
//   // .extract({
//   //   top:0,
//   //   left:0,
//   //   width:1000,
//   //   height:1000
//   // })
//   // .resize(1000,1000,{
//   //   fit:'contain',
//   //   position:'centre',
//   //   background: '#fff',
//   //   withoutEnlargement:true
//   // })
//   // .overlayWith(overlayPath,{
//   //   gravity:'northwest',
//   //   // tile:true,
//   //   // cutout:true
//   // })
//   // .normalise()
//   // .rotate(null,{
//   //   background: '#fff',
//   // })
//   .jpeg({
//     quality:80
//   })
//   .toFile(outPut)
//   .then(res => {
//     console.log(res);
//   })
// })()
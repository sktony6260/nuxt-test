import imgOptimize from './imgOptimize';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
const imgInputAsRectangle = path.resolve(__dirname, '../static/rectangle.jpg');
// const c = new imgOptimize();
// c.toFile(imgInputAsRectangle).then(res => {
//   console.log(res);
// })
const dirpath = path.resolve(__dirname,'../a/b/c/d/e');
const mkdirs = (dirpath) => {
  if (fs.existsSync(dirpath)) {
    return;
  }else{
    mkdirs(path.dirname(dirpath));
  }
  fs.mkdirSync(dirpath);
}

// sharp(imgInputAsRectangle).resize({width:null,height:200}).toFile(path.resolve(__dirname,'../static/out.jpg'));
console.log(path.extname(imgInputAsRectangle));

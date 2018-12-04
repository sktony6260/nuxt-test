// const sharp = require('sharp');
// const path = require('path');
// const {imgOption,uploadPath} = require('./config');
import sharp from'sharp';
import path from 'path';
import {imgOption,uploadPath} from './config';
const DEFAULT_OPTIONS = {
  width:null,
  height:null,
  fit:imgOption.fit[0],//cover,contain,fill,inside,outside
  position:'centre',//top, right top, right, right bottom, bottom, left bottom, left, left top
  jpgQuality:80,//质量，整数1-100(可选，默认80)
  pngQuality:9, //zlib压缩级别，0-9(可选，默认9)
  webpQuality:80,//质量，整数1-100(可选，默认80),
  background:'#fff',//color颜色,
  withoutEnlargement:true,
  format:'jpg',//指定格式化图片类型
  dest:uploadPath
};
const FORMAT_LIST = ['jpg','jpep','png','webp'];
class OptimizeImg{
  constructor(opts,extraOpt = {}){
    this.opts = opts || {};
    this.options = {
      ...DEFAULT_OPTIONS,
      ...opts
    }
    this.extract = {
      ...{},
      ...extraOpt
    }
    this.originMeta = null;
  }
  makeSharpInstance(inputImg){
    return sharp(inputImg);
  }
  async resize(inputImg){
    const opts = this.options;
    this.originMeta = await this.makeSharpInstance(inputImg).metadata();
    return this
          .makeSharpInstance(inputImg)
          .resize({
            width:!opts.width?null:parseInt(opts.width),
            height:!opts.height?null:parseInt(opts.height),
            fit:opts.fit,
            position:opts.position,
            background:opts.background,
            withoutEnlargement:opts.withoutEnlargement
          })
          .toBuffer()
          ;
  }
  async toFile(inputImg){
    const opts = this.options;
    console.log(opts);
    const buffer = await this.resize(inputImg);
    const sharp = await this.makeSharpInstance(buffer);
    let format = this.originMeta.format;
    let outPut = '';
    let res = null;
    const arr = inputImg.split('/');
    const fileName = inputImg.split('/').pop();
    const width = !opts.width?this.originMeta.width:parseInt(opts.width);
    const height = !opts.width?this.originMeta.height:parseInt(opts.height);
    let saveName = `${fileName.split('.').shift()}_${width}_${height}`;
    if (this.opts.format && FORMAT_LIST.includes(this.opts.format)) {
      format = this.opts.format
    }
    if (format == 'jpg' || format == 'jpeg') {
      saveName = saveName + '.jpg';
      outPut = path.join(opts.dest,saveName);
      res = await sharp
        .jpeg({
          ...this.extraOpt,
          quality:this.options.jpgQuality
        })
        .toFile(outPut);
    }else if(format == 'png'){
      saveName = saveName + '.png';
      outPut = path.join(opts.dest,saveName);
      res = await sharp
        .png({
          ...this.extraOpt,
          compressionLevel:this.options.pngQuality
        })
        .toFile(outPut);
    }else if(format == 'webp'){
      saveName = saveName + '.webp';
      outPut = path.join(opts.dest,saveName);
      res = await sharp
        .webp({
          ...this.extraOpt,
          quality:this.options.webpQuality
        })
        .toFile(outPut);
    }else{
      saveName = saveName + path.extname(inputImg);
      outPut = path.join(opts.dest,saveName);
      res = await sharp.toFile(outPut);
    }
    res.filename = saveName;
    return new Promise((resolve,reject) => {
      try{
        const data = {
          origin:{
            ...this.originMeta,
            ...{
              filename:fileName
            }
          },
          optimized:res
        }
        resolve(data);
      }catch(e){
        reject(e); 
      }      
    })
  }
}
// module.exports = OptimizeImg
export default OptimizeImg

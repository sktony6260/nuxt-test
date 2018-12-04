import multer from 'multer';
import {imgTypeToExtensionMap,uploadPath}  from './config';
import fs  from 'fs';
import path from 'path';
const makeName = (mimetype)=> {
  const date = new Date();
  const separator = '-';
  const year  = date.getFullYear() 
  const month = date.getMonth()+1;
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const millisec = date.getMilliseconds();
  let name = [year,month,day,hour,min,sec,millisec].join(separator);
  let extension = imgTypeToExtensionMap[mimetype];
  name = name + extension;
  return name;
}
const mkdirs = (dirpath) => {
  if (fs.existsSync(dirpath)) {
    return;
  }else{
    mkdirs(path.dirname(dirpath));
  }
  fs.mkdirSync(dirpath);
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    mkdirs(uploadPath);
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    const name = makeName(file.mimetype);
    cb(null,name);
  }
});
const imgUpload = multer({
  storage,
  fileFilter:function(req,file,cb){
    if (imgTypeToExtensionMap[file.mimetype]) {
      return cb(null,true);
    }else{
      return cb({msg:'Only images are allowed'},false)
    }
  }
});
export default imgUpload;

import fs from'fs';
import request from 'request';
const imgDownload = (imgUrl,dest) => {
  return new Promise((resolve,reject) => {
    request
    .get({
      url:imgUrl
    })
    .on('response',res => {
      console.log('response');
      console.log(res.headers);
    })
    .pipe(fs.createWriteStream(dest))
    .on('error',err => {
      console.log('error');
      console.log(res)
      reject(new Error('error'));
    })
    .on('finish',(res) => {
      console.log('finish');
      resolve(res);
    })
    .on('close',() => {
      console.log('close');
    });
  })
}
export default imgDownload;
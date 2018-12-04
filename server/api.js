import express from 'express'
import {imgUpload,imgOptimize} from '../imgServer';
const router = express.Router();
const mergePromise = req => {
  let {width,height,fit,position} = req.body;
  const optImg = new imgOptimize({
    width,
    height,
    fit,
    position
  });
  var arr = [];
  return (async function(){
    for (var i = 0; i < req.files.length; i++) {
      const res = await optImg.toFile(req.files[i].path); 
      arr.push(res);
    }
    return arr;
  })();
};
router.post('/upload',function(req,res,next) {
  imgUpload.array('myPic')(req,res,function(err){
    if (err) {
      console.error(err);
      res.send(err.msg)
    }else{
      // console.log(req.files);
      mergePromise(req).then(_res => {
        console.log(_res);
        // const result = req.files.map((file,index) => {
        //   let item = _res[index];
        //   item.origin.filename = file.filename;
        //   return item;
        // })
        res.send(_res);
      });
    }
  });
})
export default router;
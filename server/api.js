import express from 'express'
import {imgUpload,imgOptimize} from '../imgServer';
const router = express.Router();
const mergePromise = req => {
  const optImg = new imgOptimize(req.body);
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
    // console.log(req.body);
    if (err) {
      console.error(err);
      res.send(err.msg)
    }else{
      // console.log(req.files);
      mergePromise(req).then(_res => {
        console.log(_res);
        res.send(_res);
      });
    }
  });
})
export default router;
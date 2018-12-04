<template>
  <div class="wrap-img-list" v-if="data.length>0">
    <div class="img-list">
      <div class="img-box" v-for="img in data">
        <div class="origin-part">
          <div class="img-con">
            <div class="mt origin">origin image</div>
            <div class="mc"><img :src="img.origin.filename" /></div>
          </div>
          <div class="img-detail">
            <dl>
              <dt>format:</dt>
              <dd>{{img.origin.format}}</dd>
            </dl>
            <dl>
              <dt>width:</dt>
              <dd>{{img.origin.width}}</dd>
            </dl>
            <dl>
              <dt>height:</dt>
              <dd>{{img.origin.height}}</dd>
            </dl>
            <dl>
              <dt>size:</dt>
              <dd>{{(img.origin.size/1024/1024).toFixed(2)}}MB</dd>
            </dl>
            <dl>
              <dt>space:</dt>
              <dd>{{img.origin.space}}</dd>
            </dl>
            <dl>
              <dt>channels:</dt>
              <dd>{{img.origin.channels}}</dd>
            </dl>
            <dl>
              <dt>depth:</dt>
              <dd>{{img.origin.depth}}</dd>
            </dl>
            <dl>
              <dt>density:</dt>
              <dd>{{img.origin.density}}</dd>
            </dl>
            <dl>
              <dt>chromaSubsampling:</dt>
              <dd>{{img.origin.chromaSubsampling}}</dd>
            </dl>
            <dl>
              <dt>hasAlpha:</dt>
              <dd>{{img.origin.hasAlpha}}</dd>
            </dl>
          </div>
        </div>
        <div class="optimized-part">
          <div class="img-con">
            <div class="mt optimized">optimized image</div>
            <div class="mc"><img :src="img.optimized.filename" /></div>
          </div>
          <div class="img-detail">
            <dl>
              <dt>format:</dt>
              <dd>{{img.optimized.format}}</dd>
            </dl>
            <dl>
              <dt>width:</dt>
              <dd>{{img.optimized.width}}</dd>
            </dl>
            <dl>
              <dt>height:</dt>
              <dd>{{img.optimized.height}}</dd>
            </dl>
            <dl>
              <dt>size</dt>
              <dd>{{(img.optimized.size/1024/1024).toFixed(2)}}MB</dd>
            </dl>
            <dl>
              <dt>channels</dt>
              <dd>{{img.optimized.channels}}</dd>
            </dl>
            <dl>
              <dt>premultiplied</dt>
              <dd>{{img.optimized.premultiplied}}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .img-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .img-box{
    display: flex;
    margin-bottom: 20px;
    .origin-part,.optimized-part{
      display: flex;
      margin-right: 10px;
    }
    .img-con{
      border:3px solid #eee;
      border-radius:4px;
      border-bottom-right-radius:0;
    }
    .img-detail{
      background: #f5eaea;
      margin-top: 30px;
      border-top-right-radius:4px;
      border-bottom-right-radius:4px;
      padding: 5px 10px 0 10px;
      dl{
        display: flex;
        line-height: 22px;
        font-size: 12px;
        color: #888;
        dt{
          color: #666;
          padding-right:3px;
        }
      }
    }
    .mt{
      line-height: 30px;
      text-align: center;
      background:#eee;
      &.origin{
        color:blue;
      }
      &.optimized{
        color:green;
      }
    }
    .mc{
      width: 300px;
      height: 300px;
      line-height:300px;
      background: #d4b6b9;
      overflow: hidden;
      text-align: center;
      img{
        max-width: 100%;
        max-height: 100%;
        vertical-align: middle;
      }
    }
  }

</style>
<script>
  export default{
    props:{
      data:Array
    }
  }
</script>

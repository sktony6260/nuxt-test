<template>
  <section class="spin-wrap">
    <div class="loading-shapes">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="text">{{text}}</div>
  </section>
</template>
<script>
  export default {
    props:{
      text:String
    }
  }
</script>
<style lang="less" scoped>
  .spin-wrap{
    display: inline-block;
    .text{
      color: #722040;
      padding-top: 10px;
    }
    text-align: center;
  }
  .loading-shapes{
        width: 100px;
        height: 100px;
        z-index: 2;
        position:relative;
    }
    .loading-shapes span{
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #d3394c;
        position: absolute;
        -webkit-animation: load 1.04s ease infinite;
    }
    @-webkit-keyframes load{
        0%{
            -webkit-transform: scale(1.2);
            opacity: 1;
        }
        100%{
            -webkit-transform: scale(.3);
            opacity: 0.5;
        }
    }
    .loading-shapes span:nth-child(1){
        left: 0;
        top: 50%;
        margin-top:-10px;
        -webkit-animation-delay:0.13s;
    }
    .loading-shapes span:nth-child(2){
        left: 14px;
        top: 14px;
        -webkit-animation-delay:0.26s;
    }
    .loading-shapes span:nth-child(3){
        left: 50%;
        top: 0;
        margin-left: -10px;
        -webkit-animation-delay:0.39s;
    }
    .loading-shapes span:nth-child(4){
        top: 14px;
        right:14px;
        -webkit-animation-delay:0.52s;
    }
    .loading-shapes span:nth-child(5){
        right: 0;
        top: 50%;
        margin-top:-10px;
        -webkit-animation-delay:0.65s;
    }
    .loading-shapes span:nth-child(6){
        right: 14px;
        bottom:14px;
        -webkit-animation-delay:0.78s;
    }
    .loading-shapes span:nth-child(7){
        bottom: 0;
        left: 50%;
        margin-left: -10px;
        -webkit-animation-delay:0.91s;
    }
    .loading-shapes span:nth-child(8){
        bottom: 14px;
        left: 14px;
        -webkit-animation-delay:1.04s;
    }
</style>
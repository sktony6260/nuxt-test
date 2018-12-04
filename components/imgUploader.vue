<template>
  <div>
    <div class="wrap">
      <div class="left-part">
        <div class="uploader">
          <label for="myPic">
            <figure>
              <svg viewBox="0 0 1570 1024" xmlns="http://www.w3.org/2000/svg" width="70"><path d="M1283.072 430.933333c0-4.266667 0.7168-8.533333 0.7168-12.8C1283.7888 187.050667 1102.2336 0 878.2848 0c-161.553067 0-300.373333 97.416533-365.568 238.250667a205.243733 205.243733 0 0 0-93.866667-23.1424c-103.424 0-189.6448 77.858133-206.097066 179.541333C88.6784 438.0672 0 558.626133 0 700.450133 0 878.933333 140.526933 1024 313.685333 1024h359.2192v-284.433067h-168.925866L785.066667 441.924267l281.088 297.301333h-168.96v284.433067h386.594133c158.4128 0 286.344533-133.358933 286.344533-296.5504 0-163.191467-128.6144-295.8336-287.061333-296.174934z" p-id="5380" fill="#e6e6e6"></path></svg>              
            </figure>
            <span v-show="fileNum>0">{{fileNum+' files selected'}}</span>
            <span v-show="fileNum==0">Choose a file...</span>
          </label>
          <input id="myPic" type="file" multiple name="myPic" accept="image/*" ref="imgFile" @change="change($event)" />
        </div>
        <transition name="fade">
          <button v-show="fileNum>0" :disabled="disabled" class="button big" type="button" @click="upload">{{btnText}}</button>
        </transition>
      </div>
      <div class="format-layout">
        <div><span>width:</span><input class="inputText" type="number" min="10" ref="width" /></div>
        <div><span>height:</span><input class="inputText" type="number" min="10" ref="height" /></div>
        <div><span>image fit:</span><select ref="fit"><option v-for="fit in fitList" :value="fit.value" :key="fit.value">{{fit.label}}</option></select></div>
        <div><span>position:</span><select ref="pos"><option v-for="pos in positionList" :value="pos.value" :key="pos.value">{{pos.label}}</option></select></div>
        <div class="note">Note: if width and height not provide,will be output as original size,and [fit,position] options will be failure </div>
      </div>
    </div>
    <imgList :data="imgData" />
  </div>
</template>
<style lang="less" scoped>
  @red:#d3394c;
  @deep-red:#722040;
  .fade-enter-active, .fade-leave-active{
    transition: all 0.5s ease;
  }
  .fade-enter, .fade-leave-active{
    opacity: 0; 
  }
  .button{
    border: none;
    background: #eee;
    padding: 5px 10px;
    font-size:16px;
    color: #666;
    cursor: pointer;
    &.big{
      line-height: 24px;
      outline: none;
      border-radius:4px;
    }
  }
  .wrap{
    input,button,select{
      outline: none;
    }
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
  .inputText{
    background:#f1e5e6;
    border-radius:4px;
    height: 14px;
    line-height:14px;
    padding:15px 4px;
    outline: none;
    border:1px solid #f1e5e9;
    color: #999;
  }
  .left-part{
    margin-right: 100px;
    text-align: center;
  }
  .uploader{
    input[type="file"]{
      position:absolute;
      z-index: -1;
      opacity: 0;
      overflow: hidden;
    }
    label{
      cursor: pointer;
      font-size: 20px;
      color: @red;
      padding:10px;
      display: inline-block;
      text-align: center;
      figure{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: @red;
        display: flex;
        margin: 0 auto 5px;
        align-items: center;
        justify-content: center;
        text-align: center;
        svg{
          vertical-align: middle;
        }
      }
      &:hover{
        color: @deep-red;
        figure{
          background:@deep-red;
        }
      }
    }
    
  }
  .format-layout{
    & > div{
      text-align: left;
      margin-bottom: 15px;
      span{
        display: inline-block;
        width: 80px;
        color: #999;
      }
    }
  }
  .note{
    color: #666;
    font-size: 12px;
  }
</style>
<script>
  import imgList from '~/components/imgList.vue'
  export default {
    components: {
      imgList
    },
    data(){
      return {
        disabled:false,
        btnText:'Upload',
        fileNum:0,
        imgData:[],
        fitList:[
          {
            value:'cover',
            label:'cover'
          },
          {
            value:'contain',
            label:'contain'
          },
          {
            value:'fill',
            label:'fill'
          },
          {
            value:'inside',
            label:'inside'
          },
          {
            value:'outside',
            label:'outside'
          }
        ],
        positionList:[
          {
            value:'centre',
            label:'centre'
          },
          {
            value:'top',
            label:'top'
          },
          {
            value:'right top',
            label:'right top'
          },
          {
            value:'right',
            label:'right'
          },
          {
            value:'right bottom',
            label:'right bottom'
          },
          {
            value:'bottom',
            label:'bottom'
          },
          {
            value:'left bottom',
            label:'left bottom'
          },
          {
            value:'left',
            label:'left'
          },
          {
            value:'left top',
            label:'left top'
          }
        ]
      }
    },
    mounted(){
    
    },
    methods:{
      upload(){
        this.disabled = true;
        this.btnText = 'Uploading';
        const files = this.$refs.imgFile.files; 
        if (!files.length) {
          alert('Please select pictures before uploading - - !');
          return;
        }
        console.log(files);
        const formData = new FormData();
        for (var i = files.length - 1; i >= 0; i--) {
          formData.append('myPic',files[i]);
        }
        const {width,height,fit,pos} =  this.$refs;        
        formData.append('width',width.value);
        formData.append('height',height.value);
        formData.append('fit',fit.value);
        formData.append('position',pos.value);
        // this.$axios.defaults.baseURL = 'http://127.0.0.1:9090';
        this.$axios.post('/api/upload',formData,{
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(res => {
          console.log(res);
          const imgData = res.data.map((o,i) => {
            console.log(files[i]);
            let item = {...o};
            item.origin.size = files[i].size;
            item.origin.filename = `/img-uploads/${o.origin.filename}`
            item.optimized.filename = `/img-uploads/${o.optimized.filename}`
            return item;
          });
          console.log(imgData);
          this.imgData = imgData;
          this.$refs.imgFile.value = '';
          this.fileNum = 0;
          this.disabled = false;
          this.btnText = 'Upload';
        }).catch(e => {
          this.$refs.imgFile.value = '';
          this.fileNum = 0;
          this.disabled = false;
          this.btnText = 'Upload';
          console.log(e);
        });
      },
      change(e){
        const files = e.target.files;
        console.log(files);
        this.fileNum = files.length;
      }
    }
  }
</script>
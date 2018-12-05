<template>
  <section class="container">
    <p class="wtf">WTF!</p>
    <p class="intro">A tool for optimizing images.</p>
    <img-uploader />
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Test from '~/components/Test.vue'
import imgUploader from '~/components/imgUploader.vue'
export default {
  components: {
    Logo,
    Test,
    imgUploader
  },
  head() {
    return {
      title: 'a tool for optimizing image'
    }
  },
  data(){
    return {
      imgUrl:'ssss'
    }
  },
  mounted(){
    
  },
  async asyncData({app}){
    // let data  = await app.$axios.$get('/api/exportImg');
    // if (data) {
    //   return {
    //     imgUrl: '/f65d19abba1ec396b4c6870.jpg'
    //   }
    // }
    // data.then(res => {
    //   console.log(res);
    // });
  }
}
</script>

<style>
body{
  overflow-x: hidden;
  background: #dfc8ca;
}
.container {
  height: 100vw;
}
.wtf{
  font-size: 30px;
  text-align: center;
  color: #666;
  margin: 10px 0;
}
.intro{
  color: #888;
  text-align: center;
  margin-bottom: 30px;
  text-decoration: underline;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

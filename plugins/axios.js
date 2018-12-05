export default ({$axios}) => {
  $axios.onRequest(config => {
    console.log(config);
    if(process.browser) {
      config.baseURL = location.protocol + '//' + location.host;
      return config;
    }
  })
}
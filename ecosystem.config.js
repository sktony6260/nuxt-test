module.exports = {
  apps:[
    {
      name: "nuxt-test",
      script: './server/index.js',
      env: {
        NODE_ENV: "production",
        HOST: "0.0.0.0",
        PORT: 9090
      },
      exec_mode: "cluster",
      cwd: './',
      instances: 'max',
      error_file: `./logs/nuxt-test.err.log`,
      out_file: `./logs/nuxt-test.out.log`
    } 
  ]
}

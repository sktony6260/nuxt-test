import express from 'express'
import consola from 'consola';
import { Nuxt, Builder } from'nuxt';
import api from './api';
import path from 'path';

// Import and Set Nuxt.js options
import config from '../nuxt.config.js';

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
app.set('port', port)

config.dev = !(process.env.NODE_ENV === 'production')

const start = (async () =>  {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  app.use('/api', api)

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
})();
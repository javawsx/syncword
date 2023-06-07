const { APP_PORT } = require('./src/config/config.default')

const app = require('./src/app/index')

app.listen(APP_PORT, () => {
  console.log(`server start on http://localhost:${APP_PORT}`)
})

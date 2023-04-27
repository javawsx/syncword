const koa = require('koa')

const app = new koa()
const config = require('./config')

app.use(ctx =>{
    ctx.body = "hello koa"
})

app.listen(config.server.port, ()=>{
    console.log(`server start on http://localhost:${config.server.port}`);
})
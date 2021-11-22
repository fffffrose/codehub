const Koa  = require(`koa`)
const bodyParser = require('koa-bodyparser');

const routes = require('../router/index');
const errorHandler = require('./error-handle'); 

const app = new Koa()
 
app.use(bodyParser())

routes(app)

app.on(`error`,errorHandler)   //监听错误类型并返回

module.exports = app
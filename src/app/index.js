const Koa  = require(`koa`)
const bodyParser = require('koa-bodyparser');

const userRouter = require('../router/user.router');
const errorHandler = require('./error-handle'); 

const app = new Koa()
 
app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())//判断请求方法是否存在 POST/GET/DELETE
app.on(`error`,errorHandler)   //监听错误类型并返回

module.exports = app
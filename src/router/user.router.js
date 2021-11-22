const Router = require('koa-router');

const { verifyUser, handlePassword } = require('../middleware/user.midware');

const {
    create
} = require('../controller/user.controller');

const userRouter = new Router({ prefix: '/users' })

userRouter.post('/', verifyUser,handlePassword, create)

module.exports = userRouter
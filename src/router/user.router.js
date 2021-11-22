const Router = require('koa-router');

const {verifyUser} = require('../middleware/user.midware');

const {
    create
} = require('../controller/user.controller');

const userRouter = new Router({prefix:'/users'})

userRouter.post('/',verifyUser,create)

module.exports = userRouter
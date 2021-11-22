const jwt = require('jsonwebtoken');

const errorType = require('../constants/error-types');
const service = require('../service/user.service');
const md5password = require('../utils/password-handle');
const { PUBLIC_KEY } = require('../app/config');

const verifyLogin = async (ctx, next) => {
    //获取用户名和密码
    const { name, password } = ctx.request.body
    //判断用户名和密码不能空
    if (!name || !password) {
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit(`error`, error, ctx)
    }
    //判断用户名是否存在数据库
    const result = await service.getUserByName(name)
    const user = result[0]
    if (!user) {
        const error = new Error(errorType.USER_DOES_NOT_EXISTS)
        return ctx.app.emit(`error`, error, ctx)
    }
    //判断密码是否一致(加密)
    if (md5password(password) !== user.password) {
        const error = new Error(errorType.PASSWORD_IS_INCORRECT)
        return ctx.app.emit(`error`, error, ctx)
    }
    ctx.user = user
    await next()
}
const verifyAuth = async (ctx, next) => {
    console.log(`验证授权`);
    //获取token
    const authorization = ctx.headers.authorization
    const token = authorization.replace('Bearer ', '');
    //验证token
    try {
        const res = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ["RS256"]
        })
        ctx.user = res;
        await next();
    } catch (err) {
        console.log(err);
        const error = new Error(errorType.UNAUTHORIZATION)
        ctx.app.emit(`error`, error, ctx)
    }

}

module.exports = {
    verifyLogin,
    verifyAuth
}
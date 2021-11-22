const errorType = require('../constants/error-types');
const service = require('../service/user.service');
const md5password = require('../utils/password-handle');

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
    console.log(result);
    const user = result[0]
    if (!user) {
        const error = new Error(errorType.USER_DOES_NOT_EXISTS)
        return ctx.app.emit(`error`, error, ctx)
    }
    //判断密码是否一致(加密)
    if(md5password(password) !== user.password){
        const error = new Error(errorType.PASSWORD_IS_INCORRECT)
        return ctx.app.emit(`error`,error,ctx)
    }

    await next()
}
module.exports = {
    verifyLogin
}
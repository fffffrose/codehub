const errorType = require('../constants/error-types');
const service = require('../service/user.service');

const verifyUser = async (ctx, next) => {
    //获取用户名和密码
    const { name, password } = ctx.request.body
    //判断用户名和密码不能空
    if (!name || !password) {
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit(`error`, error, ctx)
    }
    //判断用户名是否存在数据库
    const result = await service.getUserByName(name)
    if(result.length){
        const error = new Error(errorType.USER_ALREADY_EXISTS)
        return ctx.app.emit(`error`,error,ctx)
    }

    await next()
}

module.exports = {
    verifyUser
}
const errorTypes = require('../constants/error-types');
const errorHandler = (error, ctx) => {
    let status,message
    switch(error.message){
        case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400//Bad Request 参数出错
            message = "用户名或密码不能为空~";
            break
        case errorTypes.USER_ALREADY_EXISTS:
            status = 409 //conflict
            message = `用户已注册！！`
            break
        case errorTypes.USER_DOES_NOT_EXISTS:
            status = 400//参数错误
            message = `用户名不存在！`
            break
        case errorTypes.PASSWORD_IS_INCORRECT:
            status = 400
            message = `密码错误！`
            break
        case errorTypes.UNAUTHORIZATION:
            status = 401
            message = `错误的token！`
            break
        default:
            status = 404
            message = "NOT FOUND"
    }

    ctx.status = status
    ctx.body = message
}

module.exports = errorHandler
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
            message = `用户已存在！`
            break
        default:
            status = 404
            message = "NOT FOUND"
    }

    ctx.status = status
    ctx.body = message
}

module.exports = errorHandler
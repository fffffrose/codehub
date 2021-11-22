

class AuthController {

    async login(ctx, next) {
        const {name,password} = ctx.request.body
        
        //判断用户信息


        ctx.body = `登陆成功 欢迎${name}回来`
        
        await next()
    }
}

module.exports = new AuthController()

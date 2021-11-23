const momentService = require('../service/moment.service');

class MomentController {
    async create(ctx, next) {
        //获取userid content title img ...
        const userId = ctx.user.id
        const content = ctx.request.body.content
        // console.log(userId,content);
        //插入数据库
        const res = await momentService.create(userId, content)
        ctx.body = res
    }
    async detail(ctx, next) {
        const momentId = ctx.params.momentId
        const result = await momentService.getMomentById(momentId)
        ctx.body = result
    }
    async list(ctx, next) {
        //获取数据(offset/size)
        const { offset, size } = ctx.query
        //查询数据
        const result = await momentService.getMomentLists(offset, size)
        ctx.body = result
    }
    async update(ctx, next) {
        //获取参数
        const { momentId } = ctx.params
        const { content } = ctx.request.body
        //修改内容
        const res = await momentService.update(content, momentId)
        ctx.body = res
    }
    async remove(ctx, next) {
        const { momentId } = ctx.params
        const res = await momentService.remove(momentId)
        ctx.body = res
    }
}

module.exports = new MomentController()
const fs = require('fs');

const momentService = require('../service/moment.service');
const fileService = require('../service/file.service');

const {PICTURE_PATH} = require('../constants/file-path');


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
    async addLabels(ctx, next) {
        const { labels } = ctx
        const { momentId } = ctx.params
        //判断标签与动态是否建立了联系
        for (let label of labels) {
            const isExits = await momentService.hasLabel(momentId, label.id)
            console.log(isExits);
            if (!isExits) {
                await momentService.addLabel(momentId, label.id)
            }
        }
        ctx.body = {
            statusCode: 200
        }
    }
    async fileInfo(ctx, next) {
        const { filename } = ctx.params
        const {type} = ctx.query
        const types = [`small`,'middle','large']
        if(types.some(item => item === type)){
            filename +=`-${type}`
        }
        const res = await fileService.getFileByFilename(filename)
        ctx.response.set('content-type',res.mimetype)
        ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
    }
}

module.exports = new MomentController()
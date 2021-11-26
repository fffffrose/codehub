const LabelService  = require('../service/label.sevrice');

class LabelController{
    async create(ctx,next){
        const {name} = ctx.request.body
        const  res = await LabelService.create(name)
        ctx.body = res
    }

    async list(ctx,next){
        const {limit , offset} = ctx.query
        const res = await LabelService.getLabels(limit,offset)
        ctx.body = res
    }
}

module.exports = new LabelController()
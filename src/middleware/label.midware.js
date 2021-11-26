const labelService = require('../service/label.sevrice');

const verifyLabelsExits = async (ctx, next) => {
    const { labels } = ctx.request.body
    const newLabels = []
    for (let name of labels) {
        const labelResult = await labelService.getLabelByName(name)
        const label = { name }
        if (!labelResult) {
            const res = await labelService.create(name)
            label.id = res.insertId
        } else {
            label.id = labelResult.id
        }
        newLabels.push(label)
    }
    ctx.labels = newLabels
    await next()
}
module.exports = {
    verifyLabelsExits
}
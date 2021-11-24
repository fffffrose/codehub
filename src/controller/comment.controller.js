const commentService = require('../service/comment.service');

class CommentController {
    async create(ctx, next) {
        const { id } = ctx.user
        const { momentId, content } = ctx.request.body
        const res = await commentService.create(momentId, content, id)
        ctx.body = res
    }
    async reply(ctx, next) {
        const { id } = ctx.user
        const { momentId, content } = ctx.request.body
        const { commentId } = ctx.params
        const res = await commentService.reply(momentId, content, commentId, id)
        ctx.body = res
    }
    async update(ctx, next) {
        const { content } = ctx.request.body
        const { commentId } = ctx.params
        const res = await commentService.update(content, commentId)
        ctx.body = res
    }
    async remove(ctx, next) {
        const {commentId} = ctx.params
        const res = await commentService.remove(commentId)
        ctx.body = res
    }
}

module.exports = new CommentController()

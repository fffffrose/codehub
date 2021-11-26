const fileService = require('../service/file.service');
const userService = require('../service/user.service');
const { APP_HOST, APP_PORT } = require('../app/config');
class FileController {
    async saveAvatarInfo(ctx, next) {
        //获取图像相关的信息
        const { mimetype, filename, size } = ctx.req.file
        const { id } = ctx.user
        //将数据保存到avatar数据库
        const res = await fileService.createAvatar(filename, mimetype, size, id)
        //将图片地址保存到user表中
        const avatarUrl = `http://${APP_HOST}:${APP_PORT}/users/${id}/avatar`
        await userService.updateAvatarUrlById(id, avatarUrl)
        ctx.body = `上传头像成功`
    }
    async savePictureInfo(ctx, next){
        const files = ctx.req.files
        const {id} = ctx.user
        const {momentId} = ctx.query
        //将图片信息保存到数据库中
        for(let file of files){
            const { mimetype, filename, size } = file
            await fileService.createPicture(filename,mimetype,size,id,momentId)
        }
        ctx.body = '动态配图上传完成'
    }

}

module.exports = new FileController()
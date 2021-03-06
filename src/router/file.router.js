const Router = require('koa-router');

const {
    avatarHandler,
    pictureHandler,
    pictureResize
} = require('../middleware/file.middleware');

const {
    verifyAuth,
    verifyPermission
} = require('../middleware/auth.middle');

const {
    saveAvatarInfo,
    savePictureInfo
} = require('../controller/file.controller');


const fileRouter = new Router({ prefix: '/upload' })
//上传头像
fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo)
//动态中上传图片
fileRouter.post(`/picture`, verifyAuth, pictureHandler, pictureResize, savePictureInfo)

module.exports = fileRouter

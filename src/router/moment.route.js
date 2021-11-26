const Router = require('koa-router');

const momentRouter = Router({ prefix: '/moment' })

const { verifyAuth, verifyPermission } = require('../middleware/auth.middle');
const { create, detail, list, update, remove, addLabels, fileInfo } = require('../controller/moment.controller.js');
const { verifyLabelsExits } = require('../middleware/label.midware');

momentRouter.post('/', verifyAuth, create)
momentRouter.get('/', list)
momentRouter.get('/:momentId', detail)
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelsExits, addLabels)
momentRouter.get('/images/:filename', fileInfo)
module.exports = momentRouter
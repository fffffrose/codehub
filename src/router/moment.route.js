const Router = require('koa-router');

const momentRouter = Router({ prefix: '/moment' })

const { verifyAuth, verifyPermission } = require('../middleware/auth.middle');
const { create, detail, list, update, remove } = require('../controller/moment.controller.js');


momentRouter.post('/', verifyAuth, create)
momentRouter.get('/', list)
momentRouter.get('/:momentId', detail)
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)

module.exports = momentRouter
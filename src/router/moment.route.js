const Router = require('koa-router');

const momentRouter = Router({prefix:'/moment'})

const {verifyAuth} = require('../middleware/auth.middle');
const {create,detail,list} = require('../controller/moment.controller.js');


momentRouter.post('/',verifyAuth,create)
momentRouter.get('/',list)
momentRouter.get('/:momentId',detail)

module.exports = momentRouter
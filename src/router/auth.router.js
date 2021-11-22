const Router = require('koa-router');

const AuthRouter = new Router()

const {
    login
} = require('../controller/auth.controller');
const {
    verifyLogin
} = require('../middleware/auth.middle');


AuthRouter.post('/login', verifyLogin,login)

module.exports = AuthRouter;



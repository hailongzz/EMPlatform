const Router = require('koa-router')
let router = new Router()
router.get('/',async(ctx)=>{
    ctx.body="这是home操作首页"
})
router.get('/register',async(ctx)=>{
    ctx.body = "用户home注册接口"
})
module.exports = router;
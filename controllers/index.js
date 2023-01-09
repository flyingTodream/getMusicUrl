const router = require('koa-router')()
router.get('/get', async (ctx, next) => {
    ctx.body = "hello get"
})
module.exports = router
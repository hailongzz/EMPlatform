const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()
router.get('/',async(ctx)=>{
    ctx.body="这是用户操作首页"
})
router.post('/register',async(ctx)=>{
    //取得model
    const User = mongoose.model('User')
    //把前端接受过来的POST数据封装成一个新的User对象
    let newUser = new User(ctx.request.body)
    console.log(ctx.request.body)
    ctx.body = ctx.request.body
    //用mongoose的save方法直接储存，然后判断是否陈宫，返回相应打的结果
    await newUser.save().then(()=>{
        ctx.body = {
            code:200,
            message:'注册成功'
        }
    }).catch((error)=>{
        //失败返回code =500 并返回错误信息
        ctx.body = {
            code:500,
            message:error
        }
    })
})
router.post('/login', async(ctx)=>{
    let loginUser = ctx.request.body
    console.log(loginUser)
    let userName = loginUser.userName
    let password = loginUser.password
    //引入User的Model
    const User = mongoose.model('User')
    await User.findOne({userName:userName}).exec().then(async(result)=>{
        console.log(result)
        if(result){
            let newUser = new User()
            await newUser.comparePassword(password,result.password)
            .then((isMatch)=>{
                ctx.body={code:200,message:isMatch}
            })
            .catch(error=>{
                console.log(error)
                ctx.body={code:500,message:error}
            })
        }else{
            ctx.body={code:200,message:'用户名不存在'}
        }
    }).catch(error=>{
        console.log(error)
        ctx.body={code:500,message:error}
    })
})
module.exports = router;
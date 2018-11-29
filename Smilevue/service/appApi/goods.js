const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
let  router = new Router()
const mongoose = require('mongoose')
const fs = require('fs')

router.get('/insertAllGoodsInfo',async(ctx)=>{
    fs.readFile('./data_json/goods.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        let saveCount = 0
        const Goods = mongoose.model('Goods')
        data.RECORDS.map((value,index)=>{
            console.log(value)
            let newGoods = new Goods(value)
            newGoods.save().then(()=>{
                saveCount++
                console.log('成功'+saveCount)
            }).catch((err)=>{
                console.log('失败'+err)
            })

        })
    })
    ctx.body = "开始导入数据"
})
router.get('/insetAllCategory', async(ctx)=>{
    fs.readFile('./data_json/category.json','utf8',(err,data)=>{
        data=JSON.parse(data)
        let count = 0;
        const Category = mongoose.model('Category')
        data.RECORDS.map((value,index)=>{
            console.log(value)
            let newCategory = new Category(value)
            newCategory.save().then(()=>{
                count++
                console.log('插入成功'+count)
            }).catch(error=>{
                console.log('插入失败'+error)
            })
        })
    })
    ctx.body = "开始导入数据"
})
router.get('/insertCategorySub', async(ctx)=>{
    
    fs.readFile('./data_json/category_sub.json', 'utf8', (err,data)=>{
        data = JSON.parse(data)
        const CategorySub = mongoose.model('categorySub')
        let count = 0
        data.RECORDS.map((value,index)=>{
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then(()=>{
                count++
                console.log('插入成功'+count)
            }).catch((err)=>{
                console.log('插入失败'+error)
            })
            
        })
    })

    ctx.body = "开始导入数据"
})
router.post('/goodsDetailInfo',async(ctx)=>{
    try{
        let goodsId = ctx.request.body.goodsId
        const Goods = mongoose.model('Goods')
        let result = await Goods.findOne({ID:goodsId}).exec()
        ctx.body =  {code:200,message:result}
    }catch (err){
        console.log(err)
        ctx.body={code:500,message:err}
    }
    // let goodId = ctx.request.body.goodsId
    // const Goods = mongoose.model('Goods') 
    // await Goods.findOne({ID:goodId}).exec()
    // .then(async(result)=>{
    //     ctx.body={code:200,message:result}
    // }).catch((err)=>{
    //     console.log(err)
    //     ctx.body={code:500,message:err}
    // })
})
    router.get('/getCategoryList', async(ctx)=>{
        try{
            const CategoryList = mongoose.model('Category')
            let result = await CategoryList.find().exec()
            ctx.body = {code:200,message:result}
            
        }catch(err){
            console.log(err)
            ctx.body={code:500,message:err}
        }
    })
    router.post('/getCategorySubList', async(ctx)=>{
        try{
            let cateoryId = ctx.request.body.categoryId
            const CategorySub = mongoose.model('categorySub')
            let result = await CategorySub.find({MALL_CATEGORY_ID:cateoryId}).exec()
            ctx.body = {code:200,message:result}

        }catch(err){
                ctx.body={code:500,message:err}
        }
    })
    router.post('/getGoodsListByCategorySubID',async(ctx)=>{
        try{
            let categorySubId = ctx.request.body.categorySubId 
            const Goods = mongoose.model('Goods')
            let result = await Goods.find({SUB_ID:categorySubId}).exec()
            ctx.body={code:200,message:result}
        }catch(err){
            ctx.body={code:500,message:err}
        }
    })
module.exports = router

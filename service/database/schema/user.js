const mongoose = require('mongoose')  //引入mongoose
const Schema = mongoose.Schema        //声明schema
let ObjectId = Schema.Types.ObjectId  //声明Object类型
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

//创建UserSchema
const userSchema = new Schema({
    UserId : {type:ObjectId},
    userName : {unique:true,type:String},
    password : {type:String},
    createAt : {type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
},{
    collection:'user'
})
userSchema.pre('save', function(next){
    //let user = this
    console.log(this)
    bcrypt.genSalt( SALT_WORK_FACTOR,(err,salt)=>{
        if(err) return next(err)
        bcrypt.hash(this.password,salt, (err,hash)=>{
            if(err) return next(err)
            this.password = hash
            next()
        }) 
    })
})
userSchema.methods={
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if(!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}
//发布模型
mongoose.model('User', userSchema)

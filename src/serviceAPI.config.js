const BASEURL = " https://www.easy-mock.com/mock/5bf146410058e12cdd13388c/shopVue/"
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMallInfo:BASEURL+'index',//用户首页
    getGoodsInfo:BASEURL+'getGoodsInfo',//商品信息
    registerUser: LOCALURL+'user/register',//注册页
    login: LOCALURL+'user/login',           //登录页
    getDetailInfo:LOCALURL+'goods/goodsDetailInfo',//商品详情
    getCategoryList:LOCALURL+'goods/getCategoryList', //商品大类列表
    getCategorySubList:LOCALURL+'goods/getCategorySubList',   //得到小类信息
    getGoodsListByCategorySubID:LOCALURL+'goods/getGoodsListByCategorySubID',   //得到小类商品信息

}
module.exports = URL
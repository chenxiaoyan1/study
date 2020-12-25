// pages/goodList/index.js
import request from "../../request/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    tabs:[
      {id:1,title:"综合",select:true},
      {id:2,title:"销量",select:false},
      {id:3,title:"价格",select:false}
    ],
    currentTabItemId:1,
    goods:[]
  },
  QueryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  TotalPageNum:0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:  function (options) {
    //请求商品列表数据
    this.QueryParams.cid=options.cat_id
    this.queryGoodList()
  },
  queryGoodList:async function(){
    let res =  await request({url:"/goods/search",data:this.QueryParams})
    this.TotalPageNum = Math.ceil(res.data.message.total/this.QueryParams.pagesize)
    this.setData({goods:[...this.data.goods,...res.data.message.goods]})
    //关闭下拉刷新的窗口
    wx.stopPullDownRefresh({
      success: (res) => {},
    })
  },
  handleTabItemChange:function(e){
    let tabsCopy = JSON.parse(JSON.stringify(this.data.tabs))
    tabsCopy.map(i=>i.id===e.detail.id?i.select=true:i.select=false)  
    this.setData({tabs:tabsCopy,currentTabItemId:e.detail.id})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
// console.log("11");
    this.setData({goods:[]})
    this.QueryParams.pagenum=1
    this.queryGoodList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.QueryParams.pagenum++
    if(this.QueryParams.pagenum>=this.TotalPageNum){
      wx.showToast({
        title: '没有数据啦～',
      })
    }else{
      this.queryGoodList()
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
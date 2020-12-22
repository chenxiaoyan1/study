// pages/goodDetail/index.js
import request from "../../request/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good_id:'',
    goodDetailData:{}
  },
  QueryParam:{
    goods_id:null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({good_id:options.good_id})
    this.getGoodDetail()
  },
  getGoodDetail:async function(){
    this.QueryParam.goods_id=this.data.good_id
    let res = await request({url:"/goods/detail",data:this.QueryParam})
    let resData = res.data.message
    this.setData({goodDetailData:{
      goods_id:resData.goods_id,
      pics:resData.pics,
      goods_price:resData.goods_price,
      goods_name:resData.goods_name,
      goods_small_logo:resData.goods_small_logo,
      goods_introduce:resData.goods_introduce
    }})
  },
  //点击图片放大功能
  handleGetBigImg:function(e){
    let current = e.currentTarget.dataset.url;
    let urls = this.data.goodDetailData.pics.map(i=>i.pics_mid_url)
    wx.previewImage({
      urls,
      current
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
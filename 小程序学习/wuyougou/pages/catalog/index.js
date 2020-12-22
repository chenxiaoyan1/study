// pages/catalog/index.js
import request from "../../request/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catalogData:[],
    leftData:[],
    rightData:[],
    currenIndex:0,
    //竖向滚动条的位置
    scollTop:0
  },
  handleLeft:function(e){
    this.setData({currenIndex:e.currentTarget.dataset.index})
    request({url: "/categories"}).then(
      res=>{
        let lef = res.data.message.map(item=>item.cat_name)
        let rig = res.data.message.map(item2=>item2.children)
        this.setData({catalogData:res.data.message,leftData:lef,rightData:rig[e.currentTarget.dataset.index],scollTop:0}) 
      },
      err=>{
        console.log(err);
      }
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    var res = await request({url: "/categories"})
    let lef = res.data.message.map(item=>item.cat_name)
    let rig = res.data.message.map(item2=>item2.children)
     this.setData({catalogData:res.data.message,leftData:lef,rightData:rig[this.data.currenIndex]}) 
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
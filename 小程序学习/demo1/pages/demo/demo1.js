// pages/demo/demo1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[
      {id:1,name:"tom",age:12},
      {id:2,name:"jerry",age:13},
      {id:3,name:"lili",age:14}
    ],
    num:0
  },
  handleInput:function(e){
    //给data中数据重新赋值，e.detail.value 获得input的值
    this.setData({num:e.detail.value})
  },
  handleClick:function(e){
    //e.currentTarget.dataset获得传递的自定义属性的值
    this.setData({num:this.data.num+e.currentTarget.dataset.type})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
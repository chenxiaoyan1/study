  // pages/demo3/demo3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tabs:[
        {id:1,title:"首页",isActive:true},
        {id:2,title:"我的",isActive:false},
        {id:3,title:"热门",isActive:false},
        {id:4,title:"推荐",isActive:false}
      ]
  },
  bindItemChange:function(e){
    console.log(e);
    let tabsCopy = JSON.parse(JSON.stringify(this.data.tabs))
      tabsCopy.forEach((item)=>{
        item.id===e.detail.value?item.isActive=true:item.isActive=false
      })
      this.setData({tabs:tabsCopy})
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady");
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow");
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide");
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnLoad");
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh");

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom");
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
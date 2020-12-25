
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemWidth:15,
    itemStyle:{},
    containStyleStr:"",
    containStyle:{display:"block"}
    
  },
  handleAdd:function(){
    this.data.itemWidth++
    this.setData({itemWidth:this.data.itemWidth})
  },
  handleSub:function(){
    this.data.itemWidth--
    this.setData({itemWidth:this.data.itemWidth})
  },
  formatStyle:function(arr){
    let styleStr = ""
      for(var key in arr){
        styleStr=styleStr+key+":"+arr[key]+";"
      }
    console.log(styleStr);
    this.setData({containStyleStr:styleStr})
  },
  handleDisClick:function(e){
    this.data.containStyle.display=e.detail.value
    this.setData({"containStyle":this.data.containStyle})
    this.formatStyle(this.data.containStyle)
  },
  // handleFlexDirection:function(e){
  //   this.data.containStyle["flex-direction"]="row"
  //   this.setData({"containStyle":this.data.containStyle})
  //   this.formatStyle(this.data.containStyle)
  // },
  handleFlexDirectionValue:function(e){
    this.data.containStyle["flex-direction"]=e.detail.value
    this.setData({"containStyle":this.data.containStyle})
    this.formatStyle(this.data.containStyle)
  },
  handleFlexWrapValue:function(e){
    this.data.containStyle["flex-wrap"]=e.detail.value
    this.setData({"containStyle":this.data.containStyle})
    this.formatStyle(this.data.containStyle)
  },
  handleJustifyContentValue:function(e){
    this.data.containStyle["justify-content"]=e.detail.value
    this.setData({"containStyle":this.data.containStyle})
    this.formatStyle(this.data.containStyle)
  },
  handleAlignItemsValue:function(e){
    this.data.containStyle["align-items"]=e.detail.value
    this.setData({"containStyle":this.data.containStyle})
    this.formatStyle(this.data.containStyle)
  },
  handleAlignContentValue:function(e){
    this.data.containStyle["align-content"]=e.detail.value
    this.setData({"containStyle":this.data.containStyle})
    this.formatStyle(this.data.containStyle)
  },
  handleClick:function(){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.formatStyle(this.data.containStyle)
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
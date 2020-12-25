const { default: request } = require("../../request/request");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cert:[],
    allPrice:0,
    allCount:0,
    address:{}
  },
  handleAddAdress:function(e){
 
    wx.chooseAddress({
      success: (result) => {
        console.log(result)
        wx.setStorageSync('address', result)
      },
    })
  },

  handleChangeNum:function(e){
    let certCopy = JSON.parse(JSON.stringify(this.data.cert))
    
    if(e.detail.num<=0){
     let index =  certCopy.findIndex(i=>i.goods_id == e.detail.goods_id)
      certCopy.splice(index,1)
    }else{
      certCopy = certCopy.map(i=>{
        i.goods_id == e.detail.goods_id?i.num = e.detail.num:''
        return i;
      })
    }
    
    this.setData({cert:certCopy})
    wx.setStorageSync('cert', certCopy)
    this.getPriceAndCount()
  },
  handleCheckbox:function(e){
    let checkedGoodsIdcopy = JSON.parse(JSON.stringify(this.data.cert))
    if(e.detail.value.length>0){
      //代表选中
      checkedGoodsIdcopy = checkedGoodsIdcopy.map(i=>{
        i.goods_id == e.target.dataset.goodid?i.checked=true:''
        return i;
      })
    }else{
      //代表不选中
      checkedGoodsIdcopy = checkedGoodsIdcopy.map(i=>{
        i.goods_id == e.target.dataset.goodid?i.checked=false:''
        return i;
      })
    }
    this.setData({cert:checkedGoodsIdcopy},function(){
      this.getPriceAndCount()
    })
  },
  getPriceAndCount:function(){
    let price = 0
    let count = 0
    this.data.cert.forEach(i=>{
      if(!!i.checked){
        price=price + (i.good.goods_price*i.num)
        count = count+i.num
      }
    })
    this.setData({allCount:count,allPrice:price})
  },
  handleBuy:function(){
    if(this.data.allCount<=0){
      wx.showToast({
        title: '还没有选择商品',
      })
      return;
    }
    if(!this.data.address.provinceName){
      wx.showToast({
        title: '还没有添加地址',
      })
      return;
    }
    wx.showToast({
      title: '功能开发中...',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad");
    
    this.setData({cert:wx.getStorageSync('cert'),address:wx.getStorageSync('address')})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("ready");
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("show");
    
    this.setData({cert:wx.getStorageSync('cert'),address:wx.getStorageSync('address')})
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
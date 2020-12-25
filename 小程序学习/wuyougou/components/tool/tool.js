Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodDetail:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleAddCar:function(){
      let good = this.data.goodDetail
      let cert = wx.getStorageSync('cert')
      if(cert ==null || cert == ""){
        cert=[]
      }
      let goodIndex = cert.findIndex(i=>
        i.goods_id===this.data.goodDetail.goods_id
      )
      if(goodIndex === -1){
        cert.push({"goods_id":good.goods_id,"good":good,"num":1})
      }else{
        cert[goodIndex].num++
      }
      wx.setStorageSync('cert', cert)
      wx.showToast({
        title: '加入购物车成功',
      })
    },
    handleBuy:function(){
      console.log("立即购买")
    }
  }
})

// components/num/num.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num:{
      type:Number,
      value:0
    },
    goods_id:{
      type:String,
      value:""
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    // num:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSub:function(){
      this.data.num--
      this.setData({num:this.data.num})
      this.triggerEvent("changeNum",{num:this.data.num,goods_id:this.data.goods_id})
    
    },
    handleAdd:function(){
      this.data.num++
      this.setData({num:this.data.num})
      this.triggerEvent("changeNum",{num:this.data.num,goods_id:this.data.goods_id})
    }
  }
})

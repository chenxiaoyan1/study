// components/Tab/Tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array,
      value:[]
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
    handleClick:function(e){
      let value = e.target.dataset.val
      this.triggerEvent("itemChange",{value})
    //   let tabsCopy = JSON.parse(JSON.stringify(this.data.tabs))
    //   tabsCopy.forEach((item)=>{
    //     item.id===e.target.dataset.val?item.isActive=true:item.isActive=false
    //   })
    //   this.setData({tabs:tabsCopy})
    }
  }
})

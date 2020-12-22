//index.js
//获取应用实例
const app = getApp()
import request from "../../request/request.js"
Page({
  data: {
    swiperData:[],
    navData:[],
    floorData:[]
  },
  //事件处理函数
  bindViewTap: function() {
   
  },
  onLoad: function () {
    //轮播图
    request({url: '/home/swiperdata'}).then(
      res=>{ this.setData({swiperData:res.data.message})},
      err=>{
        console.log(err);
      }
    )
    //导航信息
    // wx.request(
    //     {
    //       url:"https://api-hmugo-web.itheima.net/api/public/v1/home/catitems",
    //       success:(res)=> {
    //         this.setData({navData:res.data.message})
    //       }
    //     }
    // )
    request({url:"/home/catitems"}).then(
      res=>{this.setData({navData:res.data.message})},
      err=>{
        console.log(err);
        
      }
    )
    //楼层图数据
    // wx.request({
    //   url: "https://api-hmugo-web.itheima.net/api/public/v1/home/floordata",
    //   success:(res)=>{
    //     this.setData({floorData:res.data.message})
    //   }
    // })
    request({url: "/home/floordata"}).then(
      res=>{this.setData({floorData:res.data.message})},
      err=>{
        console.log(err);
      }
    )
  }
})

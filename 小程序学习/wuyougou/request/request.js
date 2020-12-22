const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
let requestTimes=0
const request = function(param){
  requestTimes++
  wx.showLoading({
    title: '加载中',
    mask:true
  })
 return new Promise((resolve,reject)=>{
    wx.request({
      ...param,
      url:baseUrl+param.url,
      success(res){
        resolve(res)
      },
      fail(err){
          reject(err)
      },
      complete(){
        //让请求的最后一次再关闭loading
        requestTimes--
        if(requestTimes==0){
          wx.hideLoading()
        }
      }
    })
  })
}
export default request
let btn = document.getElementById("btn");
btn.addEventListener("click",function(){


    console.log("冒泡事件")


})
function bu(){
    console.log("捕获事件")
}
btn.addEventListener("click",function(){

   setTimeout(function(){console.log("捕获事件")},0)


},true)
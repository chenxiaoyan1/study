function Parent(name,age) {

    this.p_name = name;
    this.p_age = age;
    this.p_say = function () {
        console.log("parent say")
    }
}
Parent.prototype.pp_msg="parent prototype attr"
Parent.prototype.pp_fun = function () {
    console.log("parent prototype function")
}


function child55(name,age,sex) {
    Parent.call(this,age,sex)
    this.c_name = name
}

child55.prototype = Object.create(Parent.prototype)
child55.prototype.constructor = child55
child55.prototype.cpro = "dsd"
var c5 = new child55("name",12,"girl")


function Child12(c_age){
    Parent.call(this,"child12",13)//获得父类构造函数的属性和方法,支持传参
    this.c_age = c_age
}
function initPrototype(parent,child) {
//pro.__proto__==Parent.protype
    let pro  = Object.create(parent.prototype)
    pro.constructor = parent
    child.prototype = pro//获得父类原型的属性和方法
}
//继承父类原型属性和方法
initPrototype(Parent,Child12)
// 新增子类原型属性,一定要在上面方法的后面新增自己的原型方法
Child12.prototype.sayChild=function(){
    console.log("child prototype function")
}
var c12 = new Child12(222)
console.log(c5,c12)

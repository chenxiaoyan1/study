//! 继承
function parent(age,sex) {
    console.log("--------")
    this.age = age
    this.sex = sex
    this.type="person"
    this.arr =[1]
    this.say = function () {
        console.log("parent say")
    }
}
parent.prototype.money = function () {
    console.log("parent money")
}
parent.prototype.msg = "12"



function child1(age,sex) {
    /**
     * ! 继承方式1：通过call方式
     * 通过call实现的继承本质是改变了this的指向，让父类里面的this指到子类的上下文
     * 这样在父类里面通过this设置的属性或方法就会被写到子类上面
     * 缺点：只能继承父类构造函数上的属性和方法，不能继承父类原型上的属性和方法
     *
     *
     */
    parent.call(this,age,sex)
    this.name = "child"
}


function child2() {

}
//! 继承方式2 利用原型链
/**
 *利用原型链的向上查找机制实现继承，给child.prototype = new parent()
 *child2的实例对象的__proto__指向child2构造函数的prototype,child2的prototype指向new出来的这个parent实例对象,
 *这个parent实例对象的__proto__指向parent的prototype
 *c2本身->c2的__proto__->child2的prototype->parent实例->parent实例的__proto__->parent构造函数的prototype
 *这样既能继承父类构造函数上的属性，也能继承父类原型上的属性
 * 缺点：创造的实例对象c2.__proto===c22.__proto__ 创建的实例对象相互影响
 */
child2.prototype = new parent(12,"d")//





var c2 = new child2()
var c22 = new child2()
c2.age = 22
console.dir(c2)
console.dir(c22)
console.log(c2.__proto__===c22.__proto__)
console.log(c22.age)
console.log(c2.age)

console.log(c2.arr === c22.arr)
c2.arr=[]
console.log(c2.arr === c22.arr)
console.dir(c2)
console.dir(c22)


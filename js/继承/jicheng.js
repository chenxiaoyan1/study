//! 继承
function parent(age,sex) {
    console.log("----parents----")
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
parent.prototype.proArr = []
function child1(age,sex) {
    /**
     * ! 继承方式1：构造函数方式实现继承，通过call方式,也可以使用apply方式（自我理解就是调用call，或apply将父类执行了一遍）
     * 通过call实现的继承本质是改变了this的指向，让父类里面的this指到子类的上下文
     * 这样在父类里面通过this设置的属性或方法就会被写到子类上面
     * 缺点：只能继承父类构造函数上的属性和方法，不能继承父类原型上的属性和方法
     *
     *
     */
    // parent.call(this,age,sex)
    parent.apply(this,[...arguments])
    this.name = "child"
}
var c1 = new child1(122,3)
console.dir(c1)
c1.say()

//! 继承方式2 利用原型链
/**
 *利用原型链的向上查找机制实现继承，给child.prototype = new parent()
 *child2的实例对象的__proto__指向child2构造函数的prototype,child2的prototype指向new出来的这个parent实例对象,
 *这个parent实例对象的__proto__指向parent的prototype
 *c2本身->c2的__proto__->child2的prototype->parent实例->parent实例的__proto__->parent构造函数的prototype
 *这样既能继承父类构造函数上的属性，也能继承父类原型上的属性
 * 缺点：1)继承的父类的属性在指定原型对象（child2.prototype = new parent(12,"d")）的时候固定了，默认每个对象继承的父类的属性值都是一样的，
 * 如果要修改，就会有通过实例对象修改原型对象属性的问题（在下面）,例如当修改原型对象上的引用类型的属性的属性的时候（不是重新赋值）的时候，创造的所有实例对象的这个属性都变了，相互影响
 *
 */
function child2(name) {
    this.name = name
}
child2.prototype = new parent(12,"d")//





var c2 = new child2("c2")
var c22 = new child2("c22")
// c2.age = 22
console.dir(c2)
console.dir(c22)
/**
 *
 * ! 这里是通过实例对象去修改原型对象上的属性，分3种情况：
 * 1）当原型对象的属性为基础类型时，当通过实例对象修改这样的属性时，不会修改原型对象的属性，会在实例对象上创建一个同名属性
 * 2）当原型对象的属性为引用类型时，当通过实例对象直接赋另外的值给该属性的时候，不会修改原型对象的属性，会在实例对象上创建一个同名属性
 * 3）当原型对象的属性为引用类型时，当通过实例对象修改该引用类型的属性，会直接修改原型上面的属性的值
 */

c2.arr=[]
console.log(c2.arr === c22.arr)
console.dir(c2)
console.dir(c22)

console.log(c2 instanceof child2)
console.log(c2 instanceof parent)
console.log(c2.constructor.name)
console.log("-----------分割--------------")

/**
 * ! 继承方式3：
 * 构造函数方式+原型链方式 组合继承
 * 通过parent.call(this)改变上下文this指向，父类构造函数上的属性和方法设置到子类上，相互独立避免影响，通过child.prototype = new parent()
 * 实现继承父类原型对象上的属性和方法
 * 缺点：这种方式实现继承，父类构造函数会执行两次分别在parent.call和child.prototype=new parent()，而且父类构造函数的属性和方法会在子类和子类原型上
 * 都存在，执行delete c.arr 指删除了子类对象自身的arr属性，对象的原型上仍然可以找到，访问c.arr通过原型链查找机制仍然可以访问到
 */
function child3(name,age,sex) {
    parent.call(this,age,sex)
    this.name = name
}
child3.prototype = new parent()

var c3 = new child3("c3",18,"girl")
console.dir(c3)
console.log(c3.age)
c3.money()
var c33 = new child3("c33",19,"boy")
console.log(c33.age)
delete c3.arr
console.log(c3.arr)
console.dir(c3)
c3.money()
console.log(c3 instanceof child3)
console.log(c3 instanceof parent)
console.log("--------分割---------")

/**
 * ! 继承方式4：
 * 构造函数方式+原型链方式组合继承（优化）,解决了上面3方式的问题
 * （注：以前child.prototype = new parent()方式是为了获得parent构造函数上的属性和方式
 *      现在child.prototype = parent.prototype 只获得原型上属性和方法，用parent.call(this)获得构造函数上的属性和方法
 * ）
 * 缺点：无法区分c到底是由Child直接实例化的还是Parent直接实例化的。用instanceof关键字来判断是否是某个对象的实例就基本无效了。
  c.constructor.name =="parent"
 */
function child4(name,age,sex) {
    parent.call(this,age,sex)
    this.name = name
}

child4.prototype = parent.prototype

let c4 = new child4("c4",99,"girl")
console.dir(c4)
console.log(new parent(100,"man"))
console.log(c4.constructor.name)//parent
console.log(c4 instanceof child4)//true
console.log(c4 instanceof parent)//true
console.log("-------------分隔-----------")
/**
 * ! 继承方式5：
 * Object.create方式实现继承,
 * child5.prototype = Object.create(parent.prototype)//child.prototype.__proto__=parent.prototype,通过create创建的child.prototype这个新对象的
 * __proto__===parent的原型对象，所以就继承了parent原型上的属性和方法，重新指定了constructor为child,相当于在中间加了一层，console.dir(c5)看一下
 *
 * child5.prototype.constructor = child5
 * ! let newObj = Object.create(old) 方法创建一个新对象,使用现有的对象来提供新创建的对象的__proto__,就相当于：newObj.__proto__ = old
 *
 */
function child5(name,age,sex) {
    parent.call(this,age,sex)
    this.name = name
}

function child55(name,age,sex) {
    parent.call(this,age,sex)
    this.name = name
}

child55.prototype = Object.create(parent.prototype)
child55.prototype.constructor = child55

//! 这里不用Object.create ,直接是上面继承方式4 的继承上指定constructor ，这样为什么不可以呢，因为子类的原型对象的属性和从父类那里集成的原型对象属性混在一起了，从数据结构上也不如Object.create的方式好
child5.prototype = parent.prototype
child5.prototype.constructor = child5
child5.prototype.cpro = "dsd"
child55.prototype.cpro = "dsd"
let c5 = new child5("c5",22,"girl")
let c55 = new child55("c55",25,"boy")
console.log(child5.prototype.__proto__===parent.prototype)//true
console.log(c5,c55)
console.log(c55)
c5.money()
console.log(c5.msg)

let p = new parent(12,1)
console.log(p)
console.log(c5.constructor.name)//child5
console.log(c5 instanceof child5)//true
console.log(c5 instanceof parent)//true
console.log(Object.prototype.toString.call(c5))
console.log(Object.prototype.toString.call(c55))

console.log("==================")
//! let new = Object.create(old) 方法创建一个新对象,使用现有的对象来提供新创建的对象的__proto__
var arr = new Array()
var a = Object.create(arr)
console.log(a.__proto__ === arr)//true
console.log(a.__proto__.__proto__ === Array.prototype)//true
var b = []
console.dir(Array)
console.log(a)
console.log(b)
console.log("-----------分隔-------------")
/**
 * !同时继承多个对象
 * child6.prototype = Object.assign(child6.prototype,parent.prototype,parent2.prototype,parent3.prototype)
 child6.prototype.constructor = child6
 * Object.assign(target,source,..) 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。


 */
function parent2() {
    this.parent2Name = "parent2"
}
parent2.prototype.say2=function () {
    console.log("hi parent2")
}
function parent3() {
    this.parent3Name = "parent3"
}
parent3.prototype.say3=function () {
    console.log("hi,parent3")
}


function child6(name) {
    parent.call(this)
    parent2.call(this)
    parent3.call(this)
    this.name = name
}
child6.prototype = Object.create(Object.assign(child6.prototype,parent.prototype,parent2.prototype,parent3.prototype))
child6.prototype.constructor = child6
child6.prototype.c6 = "c6"
let c6 = new child6("c6")
console.log(c6)
console.log("--------分隔-------------")

/**
 * ! 原型式继承
 * 原型式继承首先在obj()函数内部创建一个临时性的构造函数 ，然后将传入的对象作为这个构造函数的原型，最后返回这个临时类型的一个新实例。
 * 缺点：原型上的引用属性被所有实例共享，一个实例修改，其他的实例的原型上的引用属性也变了
 *      无法传参，parent的属性值一开始就定了
 * ES5提供了Object.create()函数，内部就是原型式继承
 */
function obj(o){
    function F(){}
    F.prototype = o;
    return new F()
}
var parent1 = {
    name:"tom",
    age:22,
    arr:[]
}
var c8 = obj(parent1)
var c9 = obj(parent1)
console.log(c8)
console.log(c9)
c8.arr.push("1")
console.log(c8)
console.log(c9)
c8.age1 = 12
console.log(c8,c9)
var c10 = Object.create(parent1)
console.log(c10)

/**
 * ! 寄生式继承
 *
 * 实现的本质： 给**原型式继承**穿了个马甲而已，看起来比较像继承。同样是基于某个对象或某个信息创建一个对象，然后增强对象，最后返回对象。
 缺点:同原型式继承
 *
 *
 */
function create(o){
  var f= obj(o);//o的属性会在对象的原型对象身上
     f.run = function () {//增强对象，该属性会在对象的身上
             return this.arr;
         };
     f.c_age  = "c_age"//增强对象，该属性会在对象的身上
     return f;
}
var c11 = create(parent1)
console.log(c11)

/**
 * ! 寄生组合式继承
 */
function Child12(c_age){
    parent.call(this,12,"man")//获得父类构造函数的属性和方法,支持传参
    this.c_age = c_age
}
function initPrototype(parent,child) {
    let pro  = Object.create(parent.prototype)
    pro.constructor = parent
    child.prototype = pro//获得父类原型的属性和方法
}
//继承父类原型属性和方法
initPrototype(parent,Child12)
// 新增子类原型属性
Child12.prototype.sayChild=function(){
    console.log("child prototype function")
}
var c12 = new Child12(222)
var c13 = new Child12(333)
console.log(c12)
console.log(c13)
c12.proArr.push(1)
console.log(c12,c13)

/**
 * ! es6继承方式
 * es6 使用extends方式实现继承
 */
class ParentClass {
    constructor(name,age) {
        this.name = name
        this.age = age
    }
    sayHello(){//! 定义在原型对象上的方法，相当于function方式的fun.prototype.sayHello = function(){}
        console.log("hello")
    }
}
class ChildClass extends ParentClass {
    constructor(money,name,age){
         super(name,age);//! super用来调用父类的构造函数
        this.money = money
        this.myFun = function () {
            console.log(this.name+"hahahhahahahhahahh")
        }
    }
    wolk(){//! 定义在原型对象上的方法,相当于function方式的fun.prototype.sayHello = function(){}
        console.log("wolk...")
    }
}

let c7 = new ChildClass(1000,"tom",12)
let c77 = new ChildClass(2000,"jerry",88)
console.log(c7)
console.log(c77)
c7.myFun()
c77.myFun()



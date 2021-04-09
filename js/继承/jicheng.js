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
function child2(name) {
    this.name = name
}
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

//! 这里不用Object.create ,直接是上面继承方式4 的继承上指定constructor 自我感觉是也可以，没有object.crete方式的中间__protot__对象,也能解决4的constructor问题
child5.prototype = parent.prototype
child5.prototype.constructor = child5
let c5 = new child5("c5",22,"girl")
let c55 = new child55("c55",25,"boy")
console.log(child5.prototype.__proto__===parent.prototype)//true
console.dir(c5)
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
child6.prototype = Object.assign(child6.prototype,parent.prototype,parent2.prototype,parent3.prototype)
child6.prototype.constructor = child6

let c6 = new child6("c6")
console.log(c6)
console.log("--------分隔-------------")

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



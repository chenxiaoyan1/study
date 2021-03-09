// !https://www.cnblogs.com/dhui/p/12982452.html -对象，原型，原型链

function Foo(){
    this.name = "tom" //* 实例成员
    this.age = 23 //* 实例成员
    this.say = function () {
        console.log("say")
    }
    Foo.sex = "sex" //* 静态成员，（私有属性）

}
Foo.gender = "male" //*静态成员（私有属性）
Foo.prototype.hobby = "12" // !不是静态成员，构造函数不能访问，对象可以访问
Foo.prototype.sayHello = function(){
    console.log("sayHello")
}

let f = new Foo()
let f2 = new Foo()
console.log(f.name)
console.log(Foo.gender)
console.log(f.say === f2.say)//*false 同样的方法不是一个对象，浪费内存
console.log(f.sayHello === f2.sayHello) //* true 将方法定义在构造函数的prototype上，可以共享此方法，实例对象调用的该方法都是同一个，节省内存
console.log(Foo.prototype.constructor === Foo)//* true



//! 静态成员只能通过构造函数访问，实例对象不能访问

//! 实例成员只能通过实例对象访问，构造函数不能访问

//! 一般公共方法定义在原型对象上，原型的作用是共享方法

//!对象的__proto__和构造函数的prototype指向的是一个对象，prototype的constructor指向构造函数

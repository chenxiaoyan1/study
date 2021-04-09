function Person(name,age) {
    this.name = name
    this.age = age
    this.say=function () {
        console.log("hello person")
    }
}
Person.prototype.work=function(){
    console.log("i love work")
}
Person.prototype.msg = "msg"

let p =new Person("tom",12)
console.log(p)

class Person2 {
    constructor(name,age) {
        this.name = name
        this.age = age
        this.say=function () {
            console.log("hello")
        }
    }
    work(){
        console.log("i love work")
    }
}
Person2.prototype.msg = "msg"
let p2 = new Person2("jerry",11)
console.log(p2)

class Teacher extends Person2{
    constructor(name,age,scroe) {
        super(name,age);
        this.scroe = scroe

    }

}
let t = new Teacher("zhagnsan",56,1000)
t.work()
console.log(t)
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

function Child1(sex,name,age) {
    this.c_sex = sex
    Parent.call(this,name,age)
}

var c1= new Child1("man","tom",12)
console.log(c1)

function Child2(sex) {
    this.c_sex = sex
}
Child2.prototype = new Parent("tom",12)
var c2 = new Child2("man")
console.log(c2)

function Child3(sex,name,age){
    this.c_sex = sex;
    Parent.call(this,name,age)
}
Child3.prototype = new Parent()

var c3 = new Child3("man","tom",22)
console.log(c3)
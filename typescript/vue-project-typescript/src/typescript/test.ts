import axios, {AxiosRequestConfig, AxiosResponse} from "axios"
//开始typescript之旅吧
let msg:string = "hello,typescript" //类型注解，规定变量就是这个类型

msg = "string"

let var2 = true //编译器根据类型推断可忽略：语法
var2 = false

//对象类型
let o1:object
o1={}

//任意类型any
let varAny:any
varAny=1
varAny=true

//类型数组
let arr : string[];
arr = ["1"]

let list:Array<number>
list = [1,2,3]

//使用type自定义类型
type Prop={prop:string}
function f3(o:Prop) {

}

//类型断言：某些情况下用户会比编译器更确定某个变量的具体类型，可用类型断言as
//通常情况下，类型断言会将一种更广泛的类型断言为更具体的类型
const val:any = "this is a string"
const strLength = (val as string).length

//联合类型：某个变量或参数的类型为多种类型中的一个
let var4:string|number
var4 = "1"
var4 = 1

//交叉类型：定义某种类型由多种类型合并而成
type First = {first:number}
type Second = {second:string}
type FirstAndSecond = First & Second
function f4(o:FirstAndSecond):FirstAndSecond {
    return {first:1,second:"1"}
}


//函数

//函数中的类型约束,参数是string，返回值是string，函数一旦声明，就必须传递，且类型需符合
function f(name:string):string {
    return "hello"+name
}
//void常用于没有返回值的函数
function warn():void{

}
//可选参数 ？
function f5(name:string,age?:number) {

}
f5("tom")

//参数有默认值
function f6(name:string,msg="default") {
    console.log(name+msg)
}
f6("tom"," add")//tomdefault

//参数是对象类型的数据
function f1(o:object) {

}
//参数是对象且必须有prop属性，不能有其他属性，属性值是string类型
function f2(o:{prop:string}) {

}
f2({prop:"1"})
// f2({prop:"1",name:'1'})// error

//数据重载：以参数数量或类型区分多个重名函数

//重载1
function watch(cb1: () => void): void;
// 重载2
function watch(cb1: () => void, cb2: (v1: any, v2: any) => void): void;
// 实现
function watch(cb1: () => void, cb2?: (v1: any, v2: any) => void) {
       if (cb1 && cb2) {    
           console.log('执行watch重载2');      
         } else {  
             console.log('执行watch重载1');      
         }
}

//interface 接口约束类型
interface Person{
    name:string,
    age:number
}
function f8(p:Person) {

}
// f8({name:"1"})//error
f8({name:"1",age:1})
let arr2:Person[]
arr2=[{name:"1",age:1},{name:"2",age:2}]

//泛型:泛型是指在定义函数，接口或类的时候，不预先指定具体的类型，
// 而在使用的时候再指定类型的一种特性，以此增加代码的通用性
interface Result<T> {
    code:0|1;
    data:T;
}
function f9<T>(data:T):Result<T> {
    console.log( {code:1,data:data})
    return {code:1,data:data};
}
f9<string>("hello")

//泛型应用
// get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
axios.get<Person[]>("http://localhost:3001/data").then(res=>{
    console.log(res)
    console.log(res.data[0].age)
})

//class
class Animal {
    name:string;
    //protected修饰符修饰的变量只能在类里和子类里使用，在类和子类外不能使用
    //private修饰符修饰的变量只能在类里使用，不能在子类中使用，若想在外部获得，可使用存取器
    protected hobby:string;
    constructor(name:string,hobby:string) {
        this.name = name;
        this.hobby=hobby
    }
    sayHello(){
        console.log(this.name+" say hello")
    }
    protected sleep(){
        console.log("秘密")
    }
}
class Dog extends Animal{
     age: number;
     private _sex:string
    //protected修饰符修饰的变量只能在类里和子类里使用，在类和子类外不能使用
    //private修饰符修饰的变量只能在类里使用，不能在子类中使用，若想在外部获得，可使用存取器
    constructor(name:string,hobby:string,age:number,sex:string) {
        //name父类属性 age 子类自定义的属性
        super(name,hobby);
        this.age=age
        this._sex=sex
    }
    sayHello() {
        super.sleep()
        //方法和父类重名就会执行子类自定义的方法，不会执行父类方法
        console.log("===========class============")
        console.log(this.name+this.age+this.hobby)
    }
    //存取器
    get sex():string{
         return this._sex
    }
    set sex(newSex:string){
         this._sex=newSex
    }
}
let p = new Animal("tom","吃")
// console.log(p.hobby)
console.log(p)

let d = new Dog("汪汪","吃骨头",12,"女")
console.log(d)


console.log(d.sex)
d.sex="男"
console.log(d.sex)
d.sayHello()




//TODO 声明文件


//装饰器：装饰器用于扩展类或者他的属性和方法 @xxx就是装饰器的写法

/**
 * 装饰器根据装饰的目标不同而参数不同
 * 类装饰器，一个参数，参数是类构造函数
 * 方法装饰器：有三个参数 target-实例，name-修饰的方法名，descriptor-属性描述符
 * 属性装饰器 两个参数 target 实例，name 属性名称，如果包一层，可以传递配置对象进来，更加灵活
 *
 * */
function leiDecorator(c:Function) {
    console.log(c)
}
function methodDecorator(a:any,b:any,c:any) {
    console.log(a)
    console.log(b)
    console.log(c)
}
@leiDecorator
class Lei {
    name:string
    constructor(name:string) {
        this.name = name
    }
    @methodDecorator
    say(){
        console.log("hello "+this.name)
    }
}

let l = new Lei("xiao");
setTimeout(function(){
    l.say()
},5000)




import "@babel/polyfill";
import "./css/style2.css"


import jpg from  "./assets/images/1.jpg"
import p from "./assets/images/icon.png"
import React from "react"
import ReactDOM from "react-dom"

console.log("index");
var img  = new Image()
img.src = p
document.body.append(img)

var img2  = new Image()
img2.src = jpg
document.body.append(img2)

let name = "name";
console.log(name);

class Hello extends React.Component{
    render() {
        return (
            <div>hello react</div>
        )
    }
}

ReactDOM.render(<Hello></Hello>,document.getElementById("app"))

const arr = [new Promise(() => {}), new Promise(() => {})];
arr.map(item => {  console.log(item); });

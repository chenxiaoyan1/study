import React from "react";
import isEqual from "./objectIs";
class Test extends React.Component{
    constructor() {
        super();
        this.state = {num:{count:1}}
    }
    handleClick = ()=>{
        this.setState({num:{count:this.state.num.count+1}})
        // ! 这里如果让count不变，pureComponent后也会重新渲染子组件，因为浅比较比较的是引用地址，这里引用地址变了，
        // ! 如果用深比较就不会重新渲染，因为所有属性都没变（深比较不比较引用地址，递归比较属性的值）,但是深比较需要递归，耗费性能
        //this.setState({num:{count:this.state.num.count}})

    }
    render() {
        return (
            <div>
                <p>{this.state.num.count}</p>
                <PureCom num={this.state}/>
                <button onClick={this.handleClick}>click</button>
            </div>
        );
    }
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
class PureCom extends React.Component{
    shallowEqual = (objA,objB)=>{
        debugger
        if (isEqual(objA, objB)) {
            return true;
        }

        if (
            typeof objA !== 'object' ||
            objA === null ||
            typeof objB !== 'object' ||
            objB === null
        ) {
            return false;
        }

        const keysA = Object.keys(objA);
        const keysB = Object.keys(objB);

        if (keysA.length !== keysB.length) {
            return false;
        }

        // Test for A's keys different from B.
        for (let i = 0; i < keysA.length; i++) {
            if (
                !hasOwnProperty.call(objB, keysA[i]) ||
                !isEqual(objA[keysA[i]], objB[keysA[i]])
            ) {
                return false;
            }
        }

        return true;
    }
    shouldComponentUpdate(nextProps, nextState){
return (
        !this.shallowEqual(this.props, nextProps) ||
        !this.shallowEqual(this.state, nextState))

    }
    render() {
        console.log("PureCom render")
        return (
            <div>
                <p>{this.props.num.num.count}</p>
            </div>
        );
    }
}

export default Test
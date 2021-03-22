import React,{PureComponent,Component} from 'react';
import {Button,message} from 'antd';
// import PureComponent from './PureComponent';



export default class PureComponentTest extends PureComponent{
    constructor(props) {
        super(props);
        this.state =  {
            title:'计数器',
            title2:{name:1},
            number:0
        }
        this.myRef = React.createRef()
    }

    add = ()=>{
        this.setState({number:this.state.number+parseInt(this.myRef.current.value)});
    }
    render(){
        console.log('App render');
        return (
            <div>
                {/*<MemoTitle title={this.state.title}/>*/}
                <Title title={this.state.title2.name}/>
                <Counter number={this.state.number}/>
                {/*<input ref={inst=>this.amount = inst}/>*/}
                <input ref={this.myRef}/>
                <button onClick={this.add}>+</button>
            </div>
        )
    }
}
class Counter extends React.PureComponent{
    render(){
        console.log('Counter render');
        return (
            <div>
                <p>{this.props.number}</p>
                <Cc/>
            </div>

        )
    }
}
function Cc(){
    console.log('cc render');
    return (
        <div>
            cc
        </div>
    )
}
//!类组件可以用继承PureComponent来优化
class Title  extends Component{
    render(){
        console.log('Title render---');
        return (
            <p>{this.props.title}</p>
        )
    }
}
//!函数组件可以用React.memo来优化
// const Title2 = React.memo(props=>{
//     console.log('Title2 render');
//     return  <p>{props.title}</p>;
// });

function Title2(props){
    console.log('Title2 render');
    return (
        <p>{props.title}</p>
    )
}
//! 装饰器只能用在class组件上

// class Title2  extends React.Component{
//     render(){
//         console.log('Title render',this);
//         return (
//             <p name={this.props.title}>{this.props.title}</p>
//         )
//     }
// }

// ! memo的实现，实质就是高阶组件，里面返回的组件继承PureComponent
function memo(Com){
    return class extends PureComponent{
        render(){
            return <Com {...this.props}></Com>
        }
    }
}
const MemoTitle = memo(Title2)


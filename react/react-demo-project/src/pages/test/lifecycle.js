import {Component} from "react";

class Lifecycle extends Component{
    constructor(props) {
        super(props);
        this.state={num:1}
        console.log("constructor---parent")
    }
    static getDerivedStateFromProps(){
        console.log("getDerivedStateFromProps---parent")
        return null
    }
    componentDidMount(): void {
        console.log("componentDidMount--parent")
    }

    add=()=>{
        this.setState({num:this.state.num+1})
    }
    render(){
        console.log("render---parent")
        return (
            <div>
                <p>lifecycle</p>
                <Child count = {this.state.num}></Child>
                <button onClick={this.add}>add</button>
            </div>
        )
    }
}

class Child extends Component{
    constructor(props) {
        super(props);
        this.state = {count:1}
        console.log("constructor---child")
    }
    static getDerivedStateFromProps(props,state){
        // ! 是一个静态函数，不能使用this;这里props和state都是最新的
        // !该函数会在挂载时，在更新时接收到新的 props，调用了 setState 和 forceUpdate 时被调用
        //!函数会返回一个对象用来更新当前的 state，如果不需要更新可以返回 null,如果不返回null,则会将
        //!返回的对象和现有的state合并
        // console.log(state)
        console.log("getDerivedStateFromProps---child",props,state)
        return null
    }
    componentDidMount(): void {
        //! componentDidMount 会在组件挂载后调用，此时可以获得DOM节点并操作,在此生命周期中可以请求数据，添加订阅
        // ! 在componentDidMount 中调用setState会触发更新操作，多调用一次render，但是用户不会看到
        // ! 中间状态，因为此次渲染发生在屏幕刷新前，但避免此操作，有性能问题
        console.log("componentDidMount---child")
        // this.setState(state=>{return {count:200}})

    }
    shouldComponentUpdate(nextProps, nextState){
        // !shouldComponentUpdate(nextProps, nextState) 有两个参数nextProps和nextState，表示新的属性和变化之后的state，返回一个布尔值，true表示会触发重新渲染，false表示不会触发重新渲染，默认返回true
        // ! 默认返回true,有时候会有性能问题，要将this.props与nextProps以及this.state与nextState进行比较来决定是否返回false，来减少重新渲染
        console.log("nextProps",nextProps,this.props)
        console.log("nextState",nextState,this.state)
        return true
    }
    getSnapshotBeforeUpdate(prevProps: Readonly<P>, prevState: Readonly<S>): SS | null {
        console.log("getSnapshotBeforeUpdate-preProps",prevProps)
        console.log("getSnapshotBeforeUpdate-prevState",prevState)
        return {name:"tom"}
        /**
         * ! getSnapshotBeforeUpdate(prevProps, prevState)
         * ! 有两个参数prevProps和prevState，表示之前的属性和之前的state，这个函数有一个返回值，会作为第三个参数传给componentDidUpdate，
         * ! 如果你不想要返回值，请返回null，不写的话控制台会有警告
         */


    }
    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        console.log("componentDidUpdate-prevProps",prevProps)
        console.log("componentDidUpdate-prevState",prevState)
        console.log(snapshot)
        /**
         * ! componentDidUpdate(prevProps, prevState, snapshot) 有三个参数prevProps，prevState，snapshot，
         * ! 表示之前的props，之前的state，和snapshot。第三个参数是getSnapshotBeforeUpdate返回的
         * ! 在这个函数里我们可以操作DOM，和发起服务器请求，还可以setState，但是注意一定要用if语句控制，否则会导致无限循环
         */
    }

    add = ()=>{
        this.setState({count:this.state.count+1})
    }
    render(){
        //! render函数应该是一个纯函数，就是返回需要渲染的东西，不应该包含其他业务逻辑，如数据
        // ! 请求，对于这些业务逻辑，移到componentDidMount和componentDidUpdate中
        console.log("render---child")
        return (
            <div>
                child  props中count:{this.props.count}---state中count:{this.state.count}
            <button onClick={this.add}>child btn</button>
            </div>
        )
    }
}

export default Lifecycle

/**
 *  ! 更新阶段：当组件的props改变了，或组件内部调用了setState或者forceUpdate发生，会发生多次
* ! 卸载阶段：
 * ! componentWillUnmount
 * ! 当我们的组件被卸载或者销毁了就会调用，我们可以在这个函数里去清除一些定时器，取消网络请求，清理无效的DOM元素等垃圾清理工作

* ! 注意不要在这个函数里去调用setState，因为组件不会重新渲染了
 */
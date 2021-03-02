import  React, {Component} from "react";
import {bindActionCreators} from "redux";

let context = React.createContext()
export class KProvider extends Component{
    render() {
        return (
                <context.Provider value={this.props.store}>
                    {this.props.children}
                </context.Provider>
        )
    }
}

//connect(mapStateToProps,mapDispatchToProps)(KReactReduxPage)
export let connect = (mapStateToProps,mapDispatchToProps)=> (Com)=>{
        return class extends Component{
            static contextType = context
            constructor(props,context) {
                //! 在context参数中有context
                super(props);
                //! 这里和视频里不一样
                let {getState} = context
                let state2 = mapStateToProps(getState())

                this.state={
                    props:{...state2}
                }

            }
            componentDidMount() {
                this.update()
                const {subscribe} = this.context;
                // * 每次执行完执行更新
                subscribe(() => {
                    this.update();
                });
            }
            update=()=>{
                let {getState,dispatch} = this.context
                // * 处理store
                let state2 = mapStateToProps(getState())
                //* 处理dispatch
                let dispatchProps = {};

                debugger
                if(typeof mapDispatchToProps == 'object'){
                    //*  当mapDispatchToProps是对象形式
                    Object.keys(mapDispatchToProps).forEach(x=>{
                        dispatchProps[x] = bindActionCreators(mapDispatchToProps[x],dispatch)
                    })
                }else if(typeof mapDispatchToProps == "function"){
                    // * 当mapDispatchToProps是函数形式
                    dispatchProps = mapDispatchToProps(dispatch)
                }else{
                    // * 当mapDispatchToProps不传的时候，默认将dispatch绑定组件props上
                    dispatchProps = {dispatch}
                }

                //! props值和前一次相同的时候还会更新，setState会触发render，触发更新操作
                this.setState({
                    props:{
                        ...state2,
                        ...dispatchProps
                    }
                })
            }
            componentDidUpdate(prevProps, prevState, snapshot) {
                console.log("update")
            }

            render() {
                    return <Com {...this.state.props} ></Com>
                }
            }
    }
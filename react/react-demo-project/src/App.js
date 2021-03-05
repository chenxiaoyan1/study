
import Main from "./pages/zujianfuhe/main";
import InputCom from "./components/input";
import Hoc from "./pages/hoc_demo/hoc_demo"
import InputCom2 from "./components/input2"
import AntdForm from "./pages/antd_page/antd_form";
import MyAntdForm from "./pages/my_antd_page/my_antd_form";
import Dialog from "./pages/portal/Dialog";
import DialogPage
  from "./pages/portal/DialogPage";
import ThemeContext from "./pages/context/context";
import userContext from "./pages/context/userContext";
import Parent from "./pages/context/parent";
import ReduxPage from "./pages/redux/redux-page";
import MyReduxPage from "./pages/my_redux/redux-page";
import ReactReduxPage from "./pages/react-redux/react-redux-page";
import store from "./pages/react-redux/store";
// import {KProvider} from "./pages/my-react-redux/react-redux"
import {KProvider} from "./pages/my-react-redux/react-redux"
import kstore from "./pages/my-react-redux/store"
// import kstore from "./pages/react-redux/store"
// import {Provider} from "react-redux"
import {useState} from "react";
import KReactReduxPage from "./pages/my-react-redux/react-redux-page";
import ReactRputerPage from "./pages/react-router/router";
import {Provider} from "react-redux";

import routerStore from "./pages/react-router/store"
import SetStateTest from "./pages/test/setState";
import RefsDemo from "./pages/test/refs-demo";
import Lifecycle from "./pages/test/lifecycle";
import EventCom from "./pages/test/event";
import ReactLazy from "./pages/other/react-lazy";
import PureComponentTest from "./pages/other/pure-component/pure-component";


var HocPage = Hoc(InputCom)
var theme = {name:"11"}

function App() {
    const [num,setNum] = useState(0)
  return (
    <div className="App">
      {/* /!*   组件复合*!/*/}
      {/* /!*<Main/>*!/*/}
      {/*/!* hoc 高阶组件*!/*/}
      {/*<HocPage defaultValue="1234567890" name="newname" title="newtitle"></HocPage>*/}
      {/*  <hr/>*/}
      {/*/!*  装饰器*!/*/}
      {/*<InputCom2 defaultValue="1234567890asdf"></InputCom2>*/}
      {/*  <hr/>*/}
      {/*/!*  antd form表单实现*!/*/}
      {/*<AntdForm></AntdForm>*/}
      {/*  <hr/>*/}
      {/*/!*  自己实现一个antd的form表单*!/*/}
      {/*<MyAntdForm></MyAntdForm>*/}
      {/*  <hr/>*/}
      {/*/!*  普通的dialog弹窗组件 标签出现在内容中，影响布局*!/*/}
      {/*<DialogPage></DialogPage>*/}
      {/*  <hr/>*/}
      {/*/!*  context 使用*!/*/}
      {/*<ThemeContext.Provider value={{theme}}>*/}
      {/*  <userContext.Provider value={{"color":"red"}}>*/}
      {/*    <Parent></Parent>*/}
      {/*  </userContext.Provider>*/}
      {/*</ThemeContext.Provider>*/}
      {/*  <hr/>*/}
      {/*  /!*redux使用*!/*/}
      {/*  <ReduxPage></ReduxPage>*/}
      {/*  <hr/>*/}
      {/*  /!*手写redux    *!/*/}
      {/*  <MyReduxPage></MyReduxPage>*/}
      {/*  <hr/>*/}
        {/* react-redux 使用   */}
        {/*<Provider store={store}>*/}
        {/*    <button onClick={()=>{setNum(num+1)}}>num++</button>*/}
        {/*    <ReactReduxPage num={num}></ReactReduxPage>*/}
        {/*</Provider>*/}
        {/*<hr/>*/}
        {/*/!* 手写react-redux   *!/*/}
        {/*<h4>手写react-redux</h4>*/}
        {/*<KProvider store = {kstore}>*/}
        {/*    <KReactReduxPage></KReactReduxPage>*/}
        {/*</KProvider>*/}
        {/*<hr/>*/}
        {/* react-router使用*/}
        {/*<Provider store={routerStore}>*/}
        {/*    <ReactRputerPage></ReactRputerPage>*/}
        {/*</Provider>*/}

    {/*    setState相关测试*/}
    {/*<SetStateTest></SetStateTest>*/}
    {/*  refs  的使用*/}
    {/*<RefsDemo></RefsDemo>*/}
    {/*生命周期的使用*/}
    {/*<Lifecycle></Lifecycle>*/}
    {/*合成事件*/}
    {/*  <EventCom/>*/}
    {/*react组件按需加载*/}
    {/*<ReactLazy></ReactLazy>*/}
    {/*pureComponent的使用*/}
    <PureComponentTest/>
    </div>
  );
}

export default App;


import Main from "./pages/zujianfuhe/main";
import InputCom from "./components/input";
import Hoc from "./pages/hoc_demo/hoc_demo"
import InputCom2 from "./components/input2"
import AntdForm from "./pages/antd_page/antd_form";
import MyAntdForm from "./pages/my_antd_page/my_antd_form";
import Dialog from "./pages/portal/Dialog";
import DialogPage
  from "./pages/portal/DialogPage";
var HocPage = Hoc(InputCom)

function App() {
  return (
    <div className="App">
     {/*   组件复合*/}
     {/*<Main/>*/}
    {/* hoc 高阶组件*/}
    <HocPage defaultValue="1234567890" name="newname" title="newtitle"></HocPage>
    {/*  装饰器*/}
    <InputCom2 defaultValue="1234567890asdf"></InputCom2>
    {/*  antd form表单实现*/}
    <AntdForm></AntdForm>
    {/*  自己实现一个antd的form表单*/}
    <MyAntdForm></MyAntdForm>
    {/*  普通的dialog弹窗组件 标签出现在内容中，影响布局*/}
    <DialogPage></DialogPage>
    </div>
  );
}

export default App;

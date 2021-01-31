import {Component} from "react"
import Layout from "./layout";
import TitlePane from "../../components/titlePane";

class Main extends Component{
    render(){
        return (
            <Layout header={false} footer={true} title={"main标题"}>
                {{
                    "content": (<TitlePane></TitlePane>),
                    "txt": "这是一段文字"
                }}
            </Layout>
        )
    }
}

export default Main
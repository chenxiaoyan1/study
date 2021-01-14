import Header from "../components/header";
import Footer from "../components/footer";
import  {Component} from "react"

/** 组件复合，类似于vue 的slot*/
class Layout extends Component{
    constructor(props) {
        super(props);
        document.title=props.title
    }
    render() {
        const {header,children,footer} = this.props
        return (
            <div>
                {header && <Header/>}
                {children.content}
                {children.txt}
                {footer && <Footer/>}
            </div>
        )
    }
}

export default Layout
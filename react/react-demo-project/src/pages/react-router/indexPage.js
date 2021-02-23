import {Component} from "react";
import {Link,Route} from "react-router-dom";
import Detail from "./detail"

class IndexPage extends Component{
    componentDidMount() {
        console.log("IndexPage componentDidMount")
    }

    componentWillUnmount() {
        console.log("IndexPage componentWillUnmount")
    }

    render() {
        console.log(this.props)
        return (
            <div>
                indexPage

            </div>
        );
    }
}
export default IndexPage
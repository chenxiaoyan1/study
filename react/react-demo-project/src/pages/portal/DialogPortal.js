import {Component} from "react";
import {createPortal} from "react-dom"

class DialogPortal extends Component{
    constructor() {
        super();
        this.el =  document.createElement("div")
    }
    componentDidMount(): void {
        document.body.append(this.el)
    }
    componentWillUnmount(): void {
        document.body.removeChild(this.el)
    }
    render(){
        let {header,content,footer} = this.props.children
        return createPortal((
            <div className="dialog">
                <div className="dialog-header">
                    {header}
                </div>
                <div className="dialog-content">
                    {content}
                </div>
                <div className="dialog-footer">
                    {footer}
                </div>
            </div>
        ),this.el)
    }
}
export default DialogPortal
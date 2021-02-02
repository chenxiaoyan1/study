import {Component} from "react";


class Dialog extends Component{
    constructor() {
        super();

    }


    render(){
        let {header,content,footer} = this.props.children
        return (
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
        )
    }
}

export default Dialog
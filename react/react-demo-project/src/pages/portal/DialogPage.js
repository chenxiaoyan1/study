import {Component} from "react";
import Dialog from "./Dialog";
import DialogPortal
    from "./DialogPortal";

class DialogPage extends Component{
    constructor() {
        super();
        this.state={show:false}
    }
    handleClick=()=>{
        this.setState({"show":!this.state.show})
    }
    render(){
        return (
            <div className="dialog_page">
                <button onClick={this.handleClick}>toggle dialog</button>
                {
                    !this.state.show ||
                    <DialogPortal>
                        {
                            {
                                "header":"title",
                                "content":<h1>content</h1>,
                                "footer":<div><button>save</button><button>close</button></div>
                            }
                        }
                    </DialogPortal>
                }
            </div>
        )
    }
}
export default DialogPage
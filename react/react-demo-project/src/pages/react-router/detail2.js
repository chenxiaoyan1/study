import {Component} from "react";

class Detail2 extends Component{
    render() {
        return (
            <div>
                detail2--{this.props.match.params.id}
            </div>
        );
    }
}

export default Detail2
import {Component} from "react";

class Detail extends Component{
    render() {
        return (
            <div>
                {console.log(this.props)}
                detail--{this.props.match.params.id}
            </div>
        );
    }
}

export default Detail
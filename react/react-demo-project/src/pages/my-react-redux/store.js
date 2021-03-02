import {createStore} from "redux";

function reducer(state = {count:0},action) {
    //console.log(state)
    switch (action.type) {
        case "ADD":
            var copyState = JSON.parse(JSON.stringify(state))
            copyState.count++
            return copyState;
        case "MINUS":
            var copyState = JSON.parse(JSON.stringify(state))
            copyState.count--
            return copyState;
        default:
            return state

    }
}

export default createStore(reducer)
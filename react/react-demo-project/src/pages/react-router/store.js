import {createStore} from "redux"

function reducer(state={isLogin:false},action) {

    switch (action.type) {
        case "LOGIN":
            let newState = JSON.parse(JSON.stringify(state))
            newState.isLogin = true
            return newState
        case "LOGOUT":
            let newState2 = JSON.parse(JSON.stringify(state))
            newState2.isLogin = false
            return newState2
        default:
            return state

    }
}


export default createStore(reducer)
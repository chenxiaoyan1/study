import {createStore} from "./my-redux";
 function reducer(state = 0,action){
    switch (action.type) {
        case "ADD":
            return state+1;
        case "MINUS":
            return state-action.value;
        default:
            return state
    }
 }

 const store = createStore(reducer)

export default store
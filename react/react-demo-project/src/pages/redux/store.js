import {createStore,applyMiddleware} from "redux";
import logger from "redux-logger"
import thunk from "redux-thunk"

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
// ! 红色的注释
// ? 蓝色的注释
// * 绿色的注释
// todo 橙色的注释

 const store = createStore(reducer,applyMiddleware(logger,thunk))

export default store
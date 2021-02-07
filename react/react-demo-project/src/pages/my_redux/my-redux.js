export function createStore(reducer) {

    var currentState;
    var listeners = []
    //先执行一遍，获得初始值；这个type不能和项目中的重复
    dispatch({type:"@QWEREQ123!"})
    function getState(){
        return currentState
    }

    function subscribe(fn){
        listeners.push(fn)

    }
    function dispatch(action){
        currentState = reducer(currentState,action)
        listeners.forEach(x=>x())
        return currentState
    }
    return {
        getState,
        subscribe,
        dispatch
    }
}

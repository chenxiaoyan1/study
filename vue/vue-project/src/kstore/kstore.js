import KVuex from "../kvuex/kvuex"
import Vue from "vue";


Vue.use(KVuex)

const  kstore = new KVuex.Store({
    state:{
        count:0
    },
    mutations:{
        add(state,n){
            state.count+=n

        }
    },
    actions:{
        addAction(context,n){
            debugger
            setTimeout(function () {
                context.commit("add",n)
            },1000)

        }
    }
})

export default kstore
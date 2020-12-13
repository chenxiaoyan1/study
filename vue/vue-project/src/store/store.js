import Vuex from "vuex"
import Vue from "vue";


Vue.use(Vuex)

const  store = new Vuex.Store({
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
            setTimeout(function () {
                context.commit("add",n)
            },1000)

        }
    }
})

export default store
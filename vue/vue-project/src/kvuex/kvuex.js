var Vue;
class Store {
    constructor(options) {
        console.log(options)
        var {state,mutations,actions} = options
        this.state = state
        Vue.util.defineReactive(this,"state",this.state)
        this.mutations = mutations
        this.actions = actions
        console.log(options)

    }
    commit(type,payload){
        console.log(type,payload)
        this.mutations[type](this.state,payload)
    }
    dispatch(type,payload){
        new Promise(() => {
            this.actions[type](this,payload)
        })
    }
}
var KVuex = {
    Store
}

KVuex.install=function (_Vue) {
    Vue = _Vue
    _Vue.mixin({
        beforeCreate() {
            if(this.$options.kstore){
                //? TODO options ?
                debugger
                _Vue.prototype.$kstore = this.$options.kstore
                console.log(_Vue.prototype.$kstore)
            }

        }
    })

}

export default KVuex
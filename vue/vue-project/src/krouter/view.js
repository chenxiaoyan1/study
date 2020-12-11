export default {
    render(h) {
        //遍历找到path对应的component
        let component;
        this.$router.options.routes.forEach(r=>{
            if(r.path == this.$router.current){
                //要渲染的component
                component = r.component
            }
        })
        return h(component)
    }
}
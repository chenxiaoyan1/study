export default {
    props:{
        to:String
    },
    methods:{
        handleClick:function(){
            this.$router.current = this.to
        }
    },
    render:function(h){
        return h("a",{attrs:{href:"#"+this.to},on:{click:this.handleClick}},this.$slots.default)
    }
}
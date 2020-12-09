<template>
    <div>
        child-{{msg}}
        <p>--</p>
        {{$attrs}}
        <p>---</p>
        {{$listeners}}
        <Cchild></Cchild>
        <button type="button" @click="tellParent">click</button>
    </div>

</template>

<script>
    import Cchild from "./Cchild";
    export default {
        name: "child",
        props:{
            msg:String
        },
        created() {
            //获得父组件中子组件标签上v-on绑定的事件
           console.log(this.$listeners)
        },
        components:{
            Cchild
        },
        methods:{
            tellParent:function () {
                console.log(this.$parent)
                console.log(this.$root)
                console.log(this.$children)
                //子向父传递数据
                // this.$emit("sendMsg","hello parent --来自child的消息")
            }
        }
    }
</script>

<style scoped>

</style>
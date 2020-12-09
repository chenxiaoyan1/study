<template>
    <div>
        parent
        <Child :msg="'hello vue'"
               :title="'hello child'"
               :name="'parent给child的信息'"
               @eventone="handleClick"
               @sendMsg="handleSendMsg"
        ></Child>
        <Child2></Child2>
    </div>
</template>

<script>
    import Child from "./Child";
   import Child2 from "./Child2";

    export default {
        name: "Parent",
        data:function(){
          return {
              name:"vue22"
          }
        },
        components:{
            Child,
            Child2
        },
        provide:function(){
            return {parent:this}
        },
        methods:{
            handleClick:function(){
                console.log(this)
            },
            handleSendMsg:function (m) {
                console.log(m)
            }
        }
    }
</script>

<style scoped>

</style>
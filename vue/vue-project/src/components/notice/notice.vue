<template>
    <div v-if="isShow" class="knotice">
        <h3>{{title}}</h3>
        <hr>
        <div>{{message}}</div>
    </div>
</template>

<script>
    export default {
        name: "notice",
        data:function(){
            return {isShow:false}
        },
        props:{
            title:{
                type:String,
                default:"提示"
            },
            message:{
                type:String,
                default:"成功"
            },
            duration:{
                type:Number,
                default:2000
            }
        },
        methods:{
            show:function () {
                this.isShow = true
                //目前是自动关闭
                setTimeout(function(){
                    this.hide()
                }.bind(this),this.duration)
            },
            hide:function(){
                this.isShow=false
                this.$el.remove()
                this.$destroy()
            }
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
    }
    .knotice{
        position: fixed;
        top: 0;
        right:0;
        margin-top: 10px;
        height: 100px;
        width: 300px;
        background-color: #ddd;
    }
</style>
<template>
    <div>
        <input :type="type" :value="value" @input="handleInput" v-bind="$attrs">
    </div>

</template>

<script>
    export default {
        inheritAttrs: false, // 设置为false避免设置到根元素上
        name: "KInput",
        props:{
            type:{
                type:String,
                default:"text"
            },
            value:String
        },
        methods:{
            handleInput:function (e) {
                this.$emit("input",e.target.value)
                //TODO 这里不合适
                this.$parent.validate(e.target.value)
            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <input type="text" :value="value" @input="handleInput">
</template>

<script>
    export default {
        name: "KInput",
        props:{
            value:String
        },
        methods:{
            handleInput:function (e) {

                this.$emit("input",e.target.value)
            }
        }
    }
</script>

<style scoped>

</style>
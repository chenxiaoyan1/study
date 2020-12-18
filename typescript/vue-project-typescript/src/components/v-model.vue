<template>
    <div>
        <!--    <input type="text" :value="val" @input="handleInput">-->
        <KInput v-model="val"></KInput>
        <KInput :value="val" @input="handleInputO"></KInput>
    </div>

</template>


<script>
    import KInput from "./KInput";

    export default {
        name: "v-model",
        components:{
            KInput
        },
        data:function () {
            return {
                val:"default"

            }
        },
        methods:{
            handleInput:function (e) {
                this.val = e.target.value+"--"
            },
            handleInputO:function (arg) {
                this.val = arg
            }
        }
    }
</script>

<style scoped>

</style>
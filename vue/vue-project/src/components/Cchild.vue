<template>
    <div>cchild--
        {{parent.name}}
    </div>
</template>

<script>
    export default {
        name: "cchild",
        //provide inject方式祖先像子组件传值
        inject:["parent"],
        created() {
            console.log(this.parent)
        }
    }
</script>

<style scoped>

</style>
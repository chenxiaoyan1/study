<template>
    <div>
        <img alt="Vue logo" src="../assets/logo.png">
        <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <!--    <Parent></Parent>-->
        <KForm></KForm>
        <p>---------------------</p>
        <Vmodel></Vmodel>
    </div>

</template>

<script>
    import KForm from "../components/form/index";
    import Vmodel from "../components/v-model";

    export default {
        name: "route",
        components: {
            KForm,
            Vmodel
        }
    }
</script>

<style scoped>

</style>
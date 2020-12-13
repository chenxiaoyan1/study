<template>
    <div>
        <img alt="Vue logo" src="../assets/logo.png">
        <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <!--    <Parent></Parent>-->
<!--        <KForm></KForm>-->
        <p>---------------------</p>
        <Vmodel></Vmodel>

        <p>------vuex使用------</p>
        <div>
<!--            <p ><button @click="handleAddCount">同步+2</button>点击commit store中count：{{$store.state.count}}</p>-->
<!--            <p ><button @click="handleDispatchAdd">异步+3</button>点击dispatch store中count的值：{{$store.state.count}}</p>-->

            <p ><button type="button" @click="handleAddCount">同步+2</button>点击commit store中count：{{$kstore.state.count}}</p>
            <p ><button type="button" @click="handleDispatchAdd">异步+3</button>点击dispatch store中count的值：{{$kstore.state.count}}</p>


        </div>

    </div>

</template>

<script>
    // import KForm from "../components/form/index";
    import Vmodel from "../components/v-model";

    export default {
        name: "route",
        created() {
            // this.$store.commit("add")
            // console.log(this.$store.state.count)
        },
        components: {
            // KForm,
            Vmodel
        },
        methods:{
            handleAddCount:function(){
                // this.$store.commit("add",2)

                console.log(this)
                this.$kstore.commit("add",2)
            },

            handleDispatchAdd:function () {
                // this.$store.dispatch("addAction",3)
                this.$kstore.dispatch("addAction",3)

            }
        }
    }
</script>

<style scoped>

</style>
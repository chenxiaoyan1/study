<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
<!--    <Parent></Parent>-->
<KForm></KForm>
    <p>---------------------</p>
    <Vmodel></Vmodel>

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Parent from "./components/Parent";
import KForm from "./components/form/index";
import Vmodel from "./components/v-model"

export default {
  name: 'App',
  components: {
    KForm,
    Vmodel
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div id="app">
<!--      <krouter-link to="/page1">Go to Foo</krouter-link>-->
<!--      <krouter-link to="/page2">Go to Bar</krouter-link>-->
<!--      <krouter-view></krouter-view>-->

<!--      <router-link to="/page1">Go to Foo1</router-link>-->
<!--      <router-link to="/page2">Go to Bar1</router-link>-->
<!--      <router-view></router-view>-->
<!--<tableUi></tableUi>-->
      <table2></table2>
<!--      <dialogCom>-->
          <fwenben2></fwenben2>
<!--      </dialogCom>-->

  </div>


</template>

<script>
// import tableUi from "./pages/table";
import table2 from "./pages/table3"
// import fwenben from "./fwenben"
import fwenben2 from "./fwenben2"
// import dialogCom from "./dialogCom"

export default {
  name: 'App',
  components: {
      // tableUi,
      table2,
      fwenben2,
      // dialogCom
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

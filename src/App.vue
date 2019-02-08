<template>
  <div id="app">
    <demand-form></demand-form>
  </div>
</template>

<script>
import DemandForm from './components/DemandForm.vue';


export default {
  name: 'app',
  components: {
      DemandForm,
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <v-app>
    <NavBar/>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue' // Import the NavBar component
export default {
  components: {
    NavBar, // Register the NavBar component
  
  },
  data: () => ({
    drawer: false,
    group: null,
  }),
  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>

<style scoped>
</style>
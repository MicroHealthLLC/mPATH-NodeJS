<template>
  <div>
    <div v-if="!this.isLoggedIn">
      <login-view></login-view>
    </div>    
    <div v-else>
      <router-view></router-view>
    </div>    
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import LoginView from "./LoginView.vue";

export default {
  name: "HomeView",
  components: {
    LoginView,
  },
  mounted() {
  },
  methods: {
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
};
</script>



<template>
    <a href="/programs/4/sheet">Click For project</a>

  </template>
  
  <script>
  export default {
    name: "LoginView",
    props: ["facility"],
    components: {  },
    mounted() {
      this.$router.push(
        `/programs/4/sheet/`
      );
    }
  };
  </script>
  
  <style></style>
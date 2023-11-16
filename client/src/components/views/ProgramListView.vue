

<template>
  <div>
    <div class="container">
      <router-link :to="`/programs/1/sheet`">Program 1</router-link>
    </div> 
  </div>
</template>
  
  <script>

  export default {
    name: "ProgramListView",
    props: ["facility"],
    components: {  },
    beforeCreate(){
      console.log("ProgramListView beforeCreate")
    },
    mounted(){
      console.log("ProgramListView mounted")
    }
  };
  </script>
  
  <style></style>
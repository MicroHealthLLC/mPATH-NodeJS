

<template>
  <div>
    <div class="container">
      <h1>All Programs</h1>
      <div v-for="project in this.allProjects" :key="project.id" >
        <p><router-link :to="`/programs/${project.id}/sheet`">{{project.name}}</router-link></p>
      </div>
    </div> 
  </div>
</template>
  
  <script>
  import { mapGetters, mapActions } from "vuex";

  export default {
    name: "ProgramListView",
    props: ["facility"],
    components: {  },
    computed: {
      ...mapGetters([
        "contentLoaded",
        'getAllProjects',
        ]),
      allProjects: {
        get() {
          return this.getAllProjects;
        }
      },
    },
    methods: {
      ...mapActions([
        'fetchAllPrograms'
      ])
    },
    beforeCreate(){
      console.log("ProgramListView beforeCreate", this.allProjects)
    },
    mounted(){
      this.fetchAllPrograms()
      console.log("ProgramListView mounted", this.allProjects)
    }
  };
  </script>
  
  <style></style>
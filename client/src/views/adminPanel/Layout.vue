<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccountGroup } from '@mdi/js';export default { 
  components: {
    SvgIcon
  },
  data() {
    return {
       path: mdiAccountGroup,
    }
  }
}
</script>
<template>
<div class="p-4">
    <div class="container">
        <router-view />
    </div>
    <v-bottom-navigation grow>
        <!-- <router-link > -->
        <v-btn to="/admin/users" class="link">
            <svg-icon type="mdi" :path="path"></svg-icon>
            <span class="link-text">Users</span>
        </v-btn>
        <!-- </router-link> -->
        <v-btn value="user-group">
            <svg-icon type="mdi" :path="path"></svg-icon>
            <span>Programs</span>
        </v-btn>
        <v-btn value="user-group">
            <svg-icon type="mdi" :path="path"></svg-icon>
            <span>Projects</span>
        </v-btn>
        <v-btn value="user-group">
            <svg-icon type="mdi" :path="path"></svg-icon>
            <span>Tasks</span>
        </v-btn>
        <v-btn value="favorites">
            <v-icon>mdi-heart</v-icon>

            <span>Issues</span>
        </v-btn>
        <v-btn value="nearby">
            <v-icon>mdi-map-marker</v-icon>

            <span>Risks</span>
        </v-btn>
        <v-btn value="nearby">
            <v-icon>mdi-map-marker</v-icon>

            <span>Effort</span>
        </v-btn>
    </v-bottom-navigation>
</div>
</template>


<style>
a.link{
  color: inherit;
  text-decoration: none;
}
.link .link-text {
  text-transform: none;
}
</style>
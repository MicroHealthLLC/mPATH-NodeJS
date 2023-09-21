<script setup>
//@setup
import { Nav, Alert } from '@/components';
import { useAuthStore } from '@/stores';
// import { Login } from '@/views/accounts'

const authStore = useAuthStore();
</script>

<template>
     <v-app>
        <div class="app-container" :class="authStore.user && 'bg-light'">
        <Nav />
        <Alert />
        <!-- <Login v-if="!authStore.user" /> -->
        <!-- <div class="container pt-4 pb-4">
            <router-view />
        </div> -->
    </div>

     </v-app>
 
</template>

<style>
@import '@/assets/base.css';
</style>
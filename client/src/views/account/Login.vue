<script setup>
//@setup
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useAuthStore } from '@/stores';

const schema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
});

async function onSubmit(values) {
    const authStore = useAuthStore();
    const { username, password } = values;
    await authStore.login(username, password);
}
</script>

<template>
    <v-card class="card m-3 mx-auto">
        <!-- Logo -->
        <v-card-item class="text-center">
            <img alt="Microhealth logo" class="logo my-5 mx-auto" src="@/assets/images/mh_logo.png" width="250"/>  
        </v-card-item>
       
        
        <!-- OAuth Sign buttons -->
        
        <div class="card-body">     
          <v-btn                      
            block
            class="text-none"
            color="red-darken-3"   
            variant="flat"
            @click="loading = !loading"
           >
           Continue with Google
          </v-btn>      
        </div>
        <div class="card-body">     
          <v-btn                      
            block
            class="text-none mb-4"
            color="cyan-darken-2"
            variant="flat"
            @click="loading = !loading"
           >
           Continue with Office 365
          </v-btn>      
        </div>
        <hr/>
        <!-- Login Form -->
        <div class="card-body">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                <div class="form-group mb-5">
                    <label>Email</label>
                    <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
                    <div class="invalid-feedback">{{ errors.username }}</div>
                </div>
                <div class="form-group mb-5">
                    <label>Password</label>
                    <Field name="password" type="password" class="form-control bg-light" :class="{ 'is-invalid': errors.password }" />
                    <div class="invalid-feedback">{{ errors.password }}</div>
                </div>
                <div class="form-group text-right">  
                    <button class="btn btn-danger" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        Login
                    </button>
                    <router-link to="register" class="btn btn-link"> <button class="btn btn-primary" :disabled="isSubmitting">Register</button></router-link>
                    <!-- <v-col cols="text-right">
                    <v-btn                     
                        class="text-none"
                        color="red-darken-3"   
                        variant="flat"
                        :disabled="isSubmitting"
                    >
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        Login
                    </v-btn>  
                    <router-link to="register" class="btn btn-link"> <button class="btn btn-danger" :disabled="isSubmitting">Register</router-link>    
                   </v-col> -->
                  
            
                </div>
            </Form>
        </div>

    </v-card>
</template>

<style>  
.card {
   width:  45%  ;
   background-color: #f7f7f7;   
}

.bg-light {
    background-color: #fff !important;
}
</style>
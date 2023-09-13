<template>
  <div class="about">
    <h1>Register</h1>
    <br>
    <input type="email" placeholder="email" name="email" v-model="email"/>
    <br>
    <input type="password" placeholder="password" name="password" v-model="password"/>
    <br>
    <button @click="register">Register</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService.js'
export default {

  data() {
    return {
     email: '',
     password: ''
    }
  },
  methods: {
   async register() {
     const response = await AuthenticationService.register({
       email: this.email,
       password: this.password
     })
     console.log(response)
    }
  },
  // mounted() {
  //   console.log(`The initial count is ${this.count}.`)
  // }
}
</script>

<style>

</style>

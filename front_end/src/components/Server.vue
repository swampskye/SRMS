<template>
<h1>Server</h1>
    <el-button plain @click=" () => router.push( { path: '/signin' } )">Signin</el-button>
  <el-button plain @click=" () => router.push( { path: '/signup' } )">Signup</el-button>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import axios from 'axios'

const router = useRouter()
const http = axios.create()

http.get('http://127.0.0.1:8000/api/user/').then(response=>{
// http.get('base/api/user/').then(response=>{
  console.log("data:",response.data)
})



</script>

<style scoped>

</style>
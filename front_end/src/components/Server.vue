<template>
<h1>Server</h1>
    <el-button plain @click=" () => router.push( { path: '/signin' } )">Signin</el-button>
  <el-button plain @click=" () => router.push( { path: '/signup' } )">Signup</el-button>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<style scoped>

</style>
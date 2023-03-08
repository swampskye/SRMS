<template>
  <div style="margin: 20px"/>
  <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
  >
    <el-form-item label="Name">
      <el-input v-model="formLabelAlign.name"/>
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-input v-model="formLabelAlign.region"/>
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input v-model="formLabelAlign.type"/>
    </el-form-item>
  </el-form>
  <el-button>Login</el-button>
  <el-button @click="()=>router.push('/')">Home</el-button>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {useRouter} from "vue-router";

const router = useRouter()

const labelPosition = ref('right')

const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
})


</script>

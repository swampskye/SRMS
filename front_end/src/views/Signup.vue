<template>
  <el-card class="box-card">
    <div style="margin: 20px"/>
    <el-form
        :label-position="labelPosition"
        label-width="150px"
        :model="formLabelAlign"
        style="max-width: 460px"
    >
      <el-form-item label="Username">
        <el-input v-model="formLabelAlign.username" placeholder="Username"/>
      </el-form-item>
      <el-form-item label="Phone Number">
        <el-input v-model="formLabelAlign.phone" placeholder="Phone Number"/>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="formLabelAlign.email" placeholder="Email"/>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="formLabelAlign.password" placeholder="Password"/>
      </el-form-item>
      <el-form-item label="Confirm Password">
        <el-input v-model="formLabelAlign.r_password" placeholder="Confirm Password"/>
      </el-form-item>
    </el-form>
    <el-button @click="create">Create</el-button>
    <el-button @click="()=>router.push('/')">Home</el-button>
  </el-card>
</template>


<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {useRouter} from "vue-router";
import axios from "axios";

const router = useRouter()

const labelPosition = ref('left')

const formLabelAlign = reactive({
  username: '',
  phone: '',
  email: '',
  password: '',
  r_password: '',
})

function create() {
  axios.post('base/api/user/signup/', {
    'username': formLabelAlign.username,
    "phone": formLabelAlign.phone,
    "email": formLabelAlign.email,
    "password": formLabelAlign.password,
    'r_password': formLabelAlign.r_password,
  }).then(res => {
    console.log('res.data:',res.data);
    console.log('res.data.code:',res.data.code)
    if (res.data.code === 200) {
      //跳转到登录
      router.push("/signin")
      console.log("注册成功")
    }
    if (res.data.code === 500) {
      console.log('status: 500')
    }
    if (res.data.code === 201) {
      console.log('status: 201')
    }
  }).catch(err => {
    console.log(err.message)
  });
}

</script>

<style>

.box-card {
  width: 480px;
  margin: auto;
  display: flex;
  /*vertical-align: middle;*/
}
</style>

<template>
  <el-card class="box-card">
    <div style="margin: 20px"/>
    <el-form
        label-position="top"
        label-width="300px"
        :model="formLabelAlign"
        style="max-width: 460px"
    >
      <!--      <el-form-item label="Staff Id">-->
      <el-form-item label="staff_id">
        <el-input v-model="formLabelAlign.staff_id" placeholder="Staff Id"/>
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
    <el-button @click="stu_create">stu_create</el-button>
    <el-button @click="admin_create">admin_create</el-button>
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
  // username: '',
  staff_id: '',
  phone: '',
  email: '',
  password: '',
  r_password: '',
})

function stu_create() {
  axios.post('base/api/user/signup/', {
  // axios.post('http://127.0.0.1:8000/api/user/signup/', {
    // 'username': formLabelAlign.username,
    'staff_id': formLabelAlign.staff_id,
    "phone": formLabelAlign.phone,
    "email": formLabelAlign.email,
    "password": formLabelAlign.password,
    'r_password': formLabelAlign.r_password,
    "is_admin": false
  }).then(res => {
    console.log('res.data:', res.data);
    console.log('res.data.code:', res.data.code)
    if (res.data.code === 200) {
      //跳转到登录
      router.push("/signin")
      console.log("stu注册成功")
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

function admin_create() {
  axios.post('base/api/user/signup/', {
  // axios.post('http://127.0.0.1:8000/api/user/signup/', {
    // 'username': formLabelAlign.username,
    'staff_id': formLabelAlign.staff_id,
    "phone": formLabelAlign.phone,
    "email": formLabelAlign.email,
    "password": formLabelAlign.password,
    'r_password': formLabelAlign.r_password,
    "is_admin": true
  }).then(res => {
    console.log('res.data:', res.data);
    console.log('res.data.code:', res.data.code)
    if (res.data.code === 200) {
      //跳转到登录
      router.push("/signin")
      console.log("admin注册成功")
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

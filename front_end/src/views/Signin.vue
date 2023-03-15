<template>
  <el-card class="box-card">
    <div style="margin: 20px"/>
    <el-form
        label-position="top"
        label-width="300px"
        :model="formLabelAlign"
        style="max-width: 460px"
    >
      <el-form-item label="Staff_id">
        <el-input v-model="formLabelAlign.staff_id" placeholder="Input Staff_id"/>
      </el-form-item>
      <el-form-item label="Password">
        <el-input type="password" v-model="formLabelAlign.password" placeholder="Input Password"/>
      </el-form-item>
    </el-form>
    <p>
      <router-link to="/signup">don't have accounts? Signup</router-link>
    </p>
    <el-button native-type="submit" @click="signin" style=" position: relative; left: 178px">Signin</el-button>
    <!--    <el-button @click="()=>router.push('/')">Home</el-button>-->
  </el-card>
</template>


<script lang="ts" setup>
import {h, reactive, ref} from 'vue'
import {useRouter} from "vue-router";
import axios from "axios";
import {ElMessage} from "element-plus";


const router = useRouter()
const labelPosition = ref('left')
const formLabelAlign = reactive({
  // username: '',
  staff_id: '',
  password: '',
})
const tip = ref(false);
const openVn = () => {
  ElMessage({
    message: h('p', null, [
      h('span', null, '系统提示：'),
      h('i', {style: 'color: red'}, '用户名或密码错误'),
    ]),
  })
}


function signin() {

  axios.post('base/api/signin/', {
    // "username": formLabelAlign.username,
    "staff_id": formLabelAlign.staff_id,
    "password": formLabelAlign.password
  }).then(res => {
    let token = res.data.access
    let user_id = res.data.user_id
    let is_admin = res.data.is_admin
    if (res.status === 200) {
      localStorage.setItem('token', token)
      localStorage.setItem('user_id', user_id)
      localStorage.setItem('is_admin', is_admin)
      console.log("save token:", token)
      console.log('save user_id:', user_id)
      router.push("/");
      console.log("登录成功！");
    } else {
      tip.value = true;
      console.log("登录失败！");
    }
  }).catch(err => {
    tip.value = true;
    openVn()
    console.log('error:', err.message);
  });
}


</script>


<style>

.box-card {
  width: 480px;
  margin: auto;
  display: flex;
}
</style>

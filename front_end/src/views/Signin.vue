<template>
  <div style="margin: 20px"/>
  <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
  >
    <el-form-item label="Username">
      <el-input v-model="formLabelAlign.username"/>
    </el-form-item>
    <el-form-item label="Password">
      <el-input type="password" v-model="formLabelAlign.password"/>
    </el-form-item>
  </el-form>
<!--  <p class="tip" v-show="tip">用户名或密码不正确</p>-->
  <el-button :plain="true" v-show="tip">VNode</el-button>
  <p>
    <router-link to="/signup">don't have accounts? Signup</router-link>
  </p>
  <el-button  @click="signin">Signin</el-button>
  <el-button  @click="()=>router.push('/')">Home</el-button>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {useRouter} from "vue-router";
import axios from "axios";


const router = useRouter()


const labelPosition = ref('right')

const formLabelAlign = reactive({
  username: '',
  password: '',
})
const tip = ref();
function signin() {
  axios.post('base/api/signin/', {
    "username": formLabelAlign.username,
    "password": formLabelAlign.password
  }).then(res => {
    let data = res.data;
    if (data.code = "201") {
      router.push("/");
      console.log("登录成功！");
    } else {
      tip.value = true;
      console.log("登录失败！");
    }
    // router.push("/");
    // console.log("登录成功");
  }).catch(err => {
    console.log(err.message);
  });
}


</script>


<style>
.tip {
    margin-left: -440px;
    margin-top: -13px;
    color: red;
}
</style>
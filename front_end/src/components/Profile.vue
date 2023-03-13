<template>

  <!--  row 1-->
  <el-row class="row-bg" justify="space-evenly">
    <el-col :span="6">
      <div class="grid-content ep-bg-purple"/>
    </el-col>
    <el-col :span="6">
      <div class="grid-content ep-bg-purple-light" style=" position: relative;"/>
      <!--      <el-avatar style="width: 200px;height: 200px;" size="large">{{ user.username }}</el-avatar>-->
      <el-avatar class="el-avatar" size="large"><h1>{{ user.username }}</h1></el-avatar>
    </el-col>
    <el-col :span="6">
      <div class="grid-content ep-bg-purple"/>
    </el-col>
  </el-row>

  <!--  row 2-->
  <el-row class="row-bg" justify="space-evenly">
    <el-col :span="6">
      <div class="grid-content ep-bg-purple"/>
    </el-col>
    <el-col :span="6">
      <div class="grid-content ep-bg-purple-light"/>
      <!--  # forms-->
      <el-form :model="user" label-position="top" label-width="120px">
        <el-form-item label="Username">
          <el-input disabled v-model="user.username"/>
        </el-form-item>
        <el-form-item label="Phone">
          <el-input disabled v-model="user.phone"/>
        </el-form-item>
        <el-form-item label="Email">
          <el-input disabled v-model="user.email"/>
        </el-form-item>
        <!--    <el-form-item label="Activity zone">-->
        <!--      <el-select v-model="form.region" placeholder="please select your zone">-->
        <!--        <el-option label="Zone one" value="shanghai"/>-->
        <!--        <el-option label="Zone two" value="beijing"/>-->
        <!--      </el-select>-->
        <!--    </el-form-item>-->
        <!--    <el-form-item label="Activity time">-->
        <!--      <el-col :span="11">-->
        <!--        <el-date-picker-->
        <!--            v-model="form.date1"-->
        <!--            type="date"-->
        <!--            placeholder="Pick a date"-->
        <!--            style="width: 100%"-->
        <!--        />-->
        <!--      </el-col>-->
        <!--      <el-col :span="2" class="text-center">-->
        <!--        <span class="text-gray-500">-</span>-->
        <!--      </el-col>-->
        <!--      <el-col :span="11">-->
        <!--        <el-time-picker-->
        <!--            v-model="form.date2"-->
        <!--            placeholder="Pick a time"-->
        <!--            style="width: 100%"-->
        <!--        />-->
        <!--      </el-col>-->
        <!--    </el-form-item>-->
        <!--    <el-form-item label="Instant delivery">-->
        <!--      <el-switch v-model="form.delivery"/>-->
        <!--    </el-form-item>-->
        <!--    <el-form-item label="Activity type">-->
        <!--      <el-checkbox-group v-model="form.type">-->
        <!--        <el-checkbox label="Online activities" name="type"/>-->
        <!--        <el-checkbox label="Promotion activities" name="type"/>-->
        <!--        <el-checkbox label="Offline activities" name="type"/>-->
        <!--        <el-checkbox label="Simple brand exposure" name="type"/>-->
        <!--      </el-checkbox-group>-->
        <!--    </el-form-item>-->
        <!--    <el-form-item label="Resources">-->
        <!--      <el-radio-group v-model="form.resource">-->
        <!--        <el-radio label="Sponsor"/>-->
        <!--        <el-radio label="Venue"/>-->
        <!--      </el-radio-group>-->
        <!--    </el-form-item>-->
        <!--    <el-form-item label="Activity form">-->
        <!--      <el-input v-model="form.desc" type="textarea"/>-->
        <!--    </el-form-item>-->
        <el-form-item>
          <div style="margin: auto">
            <el-button type="primary" @click="onSubmit">Create</el-button>
<!--            <el-button>Cancel</el-button>-->
            <el-button type="danger" @click="logout">SignOut</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="6">
      <div class="grid-content ep-bg-purple"/>
    </el-col>
  </el-row>


</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import axios from 'axios'
import {reactive, ref} from "vue";

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const router = useRouter()
// const http = axios.create()
// const username = localStorage.getItem('username')

let user = ref({})

axios.get('http://127.0.0.1:8000/api/user/f8106b3966bb4782941c7b8a658600cb/').then(response => {
// axios.get('base/api/user/f8106b3966bb4782941c7b8a658600cb').then(response=>{
  console.log("response.data.username:", response.data.username)
  user.value = response.data
})


function logout() {
  localStorage.clear()
  console.log('token cleared:', localStorage.getItem('token'))
  router.push('/signin')
}


</script>

<style scoped>

.el-avatar {
  position: relative;
  /*margin-top: -20px;*/
  left: 40%;
  /*margin-left: -20px;*/
  width: 100px;
  height: 100px;
}

.demo-type {
  display: flex;

}

.demo-type > div {
  flex: 1;
  text-align: center;
}

.demo-type > div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {

  border-radius: 4px;
  min-height: 36px;
  /*left: 100px;*/
}
</style>


<!--<script lang="ts" setup>-->
<!--import { reactive } from 'vue'-->

<!--// do not use same name with ref-->
<!--const form = reactive({-->
<!--  name: '',-->
<!--  region: '',-->
<!--  date1: '',-->
<!--  date2: '',-->
<!--  delivery: false,-->
<!--  type: [],-->
<!--  resource: '',-->
<!--  desc: '',-->
<!--})-->

<!--const onSubmit = () => {-->
<!--  console.log('submit!')-->
<!--}-->
<!--</script>-->

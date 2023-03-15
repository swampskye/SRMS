<template>
  <div class="server_table">
    <!--    table-->
    <div style="text-align: center">
      <el-table :data="tableData" width="100%" max-height="600">
        <el-table-column fixed prop="index" label="Index" width="200"></el-table-column>
        <el-table-column label="server_id" width="310">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.id }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Status" width="200">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.status === 'working' ? '✅' : '❌' }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="room" label="Room" width="200"></el-table-column>
        <el-table-column prop="last_fix_date" label="Last Fix Date" width="200">
        </el-table-column>
        <el-table-column align="right" fixed="right" width="200">
          <template #header>
            <span>Operations</span>
          </template>
          <template #default="scope">
            <el-button link type="primary" size="large" @click="ServerInfo(scope.row.id)">Detail</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px">
        <el-button type="default" size="default" @click="getFailed">Show Failed</el-button>
        <el-button type="primary" size="default" @click="getAll">Show All</el-button>
      </div>
    </div>
    <!--drawer-->

  </div>


  <el-drawer v-model="drawer" title="Server Details" :with-header="false" size="30%">
    <span><h1>Server Details</h1></span>
    <div class="demo-drawer__content">
      <el-form :model="serverData"
               label-position="top">
        <el-form-item label="Server ID" :label-width="formLabelWidth">
          <el-input disabled v-model="serverData.id" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="Index" :label-width="formLabelWidth">
          <el-input v-model="serverData.index" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="Room" :label-width="formLabelWidth">
          <el-input v-model="serverData.room" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="Status" :label-width="formLabelWidth">
          <el-select
              v-model="serverData.status"
              placeholder="Please select activity area"
          >
            <el-option label="working" value="working"/>
            <el-option label="warning" value="warning"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button type="primary" @click="update">
          {{ 'update' }}
        </el-button>
      </div>
    </div>
  </el-drawer>

</template>

<script lang="ts" setup>

import {h, onMounted, ref} from 'vue'
import axios from 'axios'
import router from "@/router";
import {ElMessage} from "element-plus";

// varieties
const tableData = ref([])

const serverData = ref({
  id: '',
  index: '',
  room: '',
  status: ''
})

const drawer = ref(false)

const formLabelWidth = '80px'


// functions
function ServerInfo(server_id: String) {
  drawer.value = true
  axios.get('base/api/server/' + server_id + '/')
      .then(res => {
        console.log('res=>', res);
        console.log('drawer.res.data=>', res.data);
        serverData.value = res.data
      })
      .catch(err => {
        // 错误处理
        console.log('res.data.error', err.data.error)
      })
}

function update() {
  axios.put('http://127.0.0.1:8000/api/server/' + serverData.value.id + '/',
      {
        'id': serverData.value.id,
        'index': serverData.value.index,
        'room': serverData.value.room,
        'status': serverData.value.status,
      }).then(response => {
    openVn()
    getAll()
    // 成功提醒
  })
}

function getAll() {
  axios.get('base/api/server/')
      .then(res => {
        tableData.value = res.data
      })
      .catch(err => {
        // 错误处理
        console.log('res.data.error', err.data.error)
      })
}

function getFailed() {
  axios.get('base/api/server/failed_servers/')
      .then(res => {
        tableData.value = res.data
      })
      .catch(err => {
        // 错误处理
        console.log('res.data.error')
        console.log('res.data.error', err.data.error)
      })
}

const openVn = () => {
  ElMessage({
    message: h('p', null, [
      h('span', null, '系统提示：'),
      h('i', {style: 'color: green'}, '更新成功'),
    ]),
  })
}
// onMounted
axios.get('base/api/server/')
    .then(res => {
      tableData.value = res.data
    })
    .catch(err => {
      // 错误处理
      console.log('res.data.error', err.data.error)
    })


</script>

<style>
.server_table .el-table__footer-wrapper, .el-table__header-wrapper {
  position: relative;
  left: 330px;
}
</style>

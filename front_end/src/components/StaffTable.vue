<template>
  <el-table :data="tableData" style="width: 60%" max-height="400">
    <el-table-column fixed prop="staff_id" label="Staff Id" width="200">
    </el-table-column>
    <el-table-column prop="phone" label="Phone" width="200"></el-table-column>
    <el-table-column prop="email" label="Email" width="300"></el-table-column>
    <el-table-column label="Status" width="200">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span>{{ scope.row.is_admin === 'admin' ? 'Admin‍🎓' : 'Student🏫' }}</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>

import {ref} from 'vue'
import axios from 'axios'

const tableData = ref([])
// let tableData
axios.get('base/api/user/')
    .then(res => {
      console.log('res=>', res);
      console.log('res.data=>', res.data);
      tableData.value = res.data
    })
    .catch(err => {
      console.log('res.data.error', err.data.error)
    })

</script>

<style>

</style>

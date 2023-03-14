<template>
  <el-table :data="tableData" style="width: 60%" max-height="300">
    <el-table-column fixed prop="staff_id" label="Staff Id" width="100">
    </el-table-column>
    <el-table-column prop="phone" label="Phone" width="200"></el-table-column>
    <el-table-column prop="email" label="Email" width="200"></el-table-column>
    <!--    <el-table-column prop="city" label="City" width="120"> </el-table-column>-->
    <!--    <el-table-column prop="address" label="Address" width="600">-->
    <!--    </el-table-column>-->
    <!--    <el-table-column prop="zip" label="Zip" width="120"> </el-table-column>-->
    <!--    <el-table-column fixed="right" label="Operations" width="200">-->
    <!--      <template #default="scope">-->
    <!--        &lt;!&ndash;        <el-button&ndash;&gt;-->
    <!--        &lt;!&ndash;          @click.prevent="deleteRow(scope.$index, tableData)"&ndash;&gt;-->
    <!--        &lt;!&ndash;          type="text"&ndash;&gt;-->
    <!--        &lt;!&ndash;          size="small"&ndash;&gt;-->
    <!--        &lt;!&ndash;        >&ndash;&gt;-->
    <!--        <el-button-->
    <!--            type="text"-->
    <!--            size="small"-->
    <!--        >-->
    <!--          Remove-->
    <!--        </el-button>-->
    <!--      </template>-->
    <!--    </el-table-column>-->
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
      console.log('res.data.error',err.data.error)
    })

</script>

<style>

</style>

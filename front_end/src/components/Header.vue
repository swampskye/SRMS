<template>
  <el-menu
      router
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
  >
    <el-menu-item index="/">Echarts</el-menu-item>
<!--    <el-sub-menu index="2">-->
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="/table">item one:table</el-menu-item>
      <el-menu-item index="">item two:server</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
<!--    <el-menu-item index="3" disabled>Info</el-menu-item>-->
    <el-menu-item index="/server">Info</el-menu-item>
    <el-menu-item index="/server">Bcharts</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {useRouter} from "vue-router";

const router = useRouter()

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

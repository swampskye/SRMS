<template>


  <el-menu
      router
      :default-active="activeIndex"
      class="el-menu-demo bg"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="white"

  >
    <!--    灰色-->
    <el-menu-item index="/" style="width: 100px">Echarts</el-menu-item>
    <!--    <el-sub-menu index="2">-->
    <el-sub-menu index="2" style="width: 100px">
      <template #title>Workspace</template>
      <el-menu-item index="/server_table">Server Table</el-menu-item>
      <el-menu-item index="/staff_table">Staff Table</el-menu-item>
      <!--      <el-menu-item index="2-3">item three</el-menu-item>-->
      <!--      <el-sub-menu index="2-4">-->
      <!--        <template #title>item four</template>-->
      <!--        <el-menu-item index="2-4-1">item one</el-menu-item>-->
      <!--        <el-menu-item index="2-4-2">item two</el-menu-item>-->
      <!--        <el-menu-item index="2-4-3">item three</el-menu-item>-->
      <!--      </el-sub-menu>-->
    </el-sub-menu>
    <!--    <el-menu-item index="3" disabled>Info</el-menu-item>-->
    <el-menu-item index="/fix" style="width: 100px">Fix</el-menu-item>
    <el-menu-item index="/profile" style="width: 100px">Profile</el-menu-item>
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

<style scoped>
.bg {
  width: 100%;
  border-right-color: transparent;
  /*box-shadow: 2px 0 6px rgb(0 21 41 / 35%);*/
  /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
  /*box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.2);*/
  box-shadow: 0px 2px 2px 2px rgba(255, 255, 255, 0.3);
}
</style>

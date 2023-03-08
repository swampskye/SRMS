<template>
  <div class="common-layout homeWrap">
    <el-container class="main_container">
      <el-header>
        <Header/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>
        <Footer/>
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

</script>


<style scoped>
.homeWrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.main_container {
  height: 100%;
}
</style>
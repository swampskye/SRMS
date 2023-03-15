<template>
  <div class="common-layout homeWrap">
    <el-container class="main_container main">
      <el-header class="header_bg">
        <Header/>
      </el-header>
      <el-main class="main">
        <router-view/>
      </el-main>
      <el-footer class="footer">
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

.main {
  background: #2c343c;
}

/*.footer{*/
/*  background-color: red;*/
/*}*/
.header_bg {
  /*background-color: red;*/
        background-color:#545c64
}
</style>
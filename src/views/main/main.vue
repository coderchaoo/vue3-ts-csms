<template>
  <el-container class="el-container">
    <el-aside width="auto">
      <nav-menu></nav-menu>
    </el-aside>
    <el-container>
      <el-header class="el-header">
        <nav-header></nav-header>
      </el-header>
      <el-main class="el-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import NavHeader from "@/components/nav-header";
import NavMenu from "@/components/nav-menu";
</script>

<style scoped lang="less">
.el-container {
  height: 100%;
}

.el-header {
  display: flex;
  color: #333;
  text-align: center;
  height: 48px;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-menu {
  border-right: none;
}
</style>

<template>
  <el-breadcrumb class="header-breadcrumb" :separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="breadcrumb in breadcrumbs"
      :key="breadcrumb.name"
      :to="{ path: breadcrumb.path }"
    >
      {{ breadcrumb.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { IBreadCrumb } from "../types";
import { ArrowRight } from "@element-plus/icons-vue";
const props = defineProps({
  breadcrumbs: {
    type: Array as PropType<IBreadCrumb[]>,
    default: () => []
  }
});
</script>

<style scoped>
.header-breadcrumb {
  display: flex;
  align-items: center;
  margin-left: 15px;
}
</style>

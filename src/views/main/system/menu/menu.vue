<template>
  <div class="menu">
    <PageContent :content-table-config="contentTableConfig" page-name="menu">
    </PageContent>
  </div>
</template>

<script lang="ts" setup>
import PageContent from "@/components/page-content";
// 配置文件
import { contentTableConfig } from "./config/content.config";
</script>

<style scoped lang="less"></style>

<template>
  <div class="role">
    <PageSearch
      :search-form-config="searchFormConfig"
      @reset-btn-click="handleResetClick"
      @query-btn-click="handleQueryClick"
    />
    <PageContent
      :content-table-config="contentTableConfig"
      page-name="role"
    ></PageContent>
  </div>
</template>

<script lang="ts" setup>
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
// 配置文件
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";

function handleResetClick() {
  console.log("重置");
}
function handleQueryClick(formData: any) {
  console.log("查询", formData);
}
</script>

<style scoped lang="less"></style>

<template>
  <div class="user">
    <PageSearch
      :search-form-config="searchFormConfig"
      @reset-btn-click="handleResetClick"
      @query-btn-click="handleQueryClick"
    />
    <PageContent
      :content-table-config="contentTableConfig"
      page-name="users"
      ref="pageContentRef"
    >
    </PageContent>
  </div>
</template>

<script lang="ts" setup>
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
// 配置文件
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { usePageSearch } from "@/hooks/use-page-search";

const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch();
</script>

<style scoped lang="less"></style>

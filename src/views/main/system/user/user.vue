<template>
  <div class="user">
    <PageSearch
      :search-form-config="formConfig"
      @reset-btn-click="handleResetClick"
      @query-btn-click="handleQueryClick"
    />
    <PageContent
      :content-table-config="contentTableConfig"
      :page-datas="pageDatas"
      :is-create="true"
    ></PageContent>
  </div>
</template>

<script lang="ts" setup>
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import { formConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { useStore } from "@/store";

import { computed } from "vue";

const store = useStore();
store.dispatch("system/getPageListAction", {
  pageName: "users",
  queryInfo: {
    offset: 0,
    size: 10
  }
});

const pageDatas = computed(() =>
  store.getters["system/getPageListData"]("users")
);

function handleResetClick() {
  console.log("重置");
}
function handleQueryClick(formData: any) {
  console.log("查询", formData);
}
</script>

<style scoped lang="less"></style>

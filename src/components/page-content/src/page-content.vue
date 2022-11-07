<template>
  <div class="page-content">
    <XcTable v-bind="tableConfig" :data-list="pageDatas" size="large">
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          type="primary"
          size="default"
          :icon="CirclePlus"
          >新建</el-button
        >
      </template>
    </XcTable>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, ref } from "vue";
import XcTable from "@/base-ui/table";
import { ITableColumnConfig } from "@/base-ui/table/types";
import { CirclePlus } from "@element-plus/icons-vue";

const props = defineProps({
  isCreate: {
    type: Boolean,
    default: false
  },
  pageDatas: {
    type: Array,
    default() {
      return [];
    }
  },
  contentTableConfig: {
    type: Object,
    default() {
      return [];
    }
  }
});
console.log("tableConfig", props.contentTableConfig);
const tableConfig = ref(props.contentTableConfig);
</script>

<style scoped>
.page-content {
  background-color: white;
}
</style>

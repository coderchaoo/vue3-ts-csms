<template>
  <div class="page-search">
    <XcForm v-model="formData" v-bind="searchFormConfig">
      <template #footer>
        <div class="handle-btns">
          <el-button @click="resetClick" :icon="Refresh">重置</el-button>
          <el-button @click="queryClick" type="primary" :icon="Search"
            >搜索</el-button
          >
        </div>
      </template>
    </XcForm>
  </div>
</template>

<script setup lang="ts">
import XcForm from "@/base-ui/form";
import { defineProps, defineEmits, ref } from "vue";
import { Refresh, Search } from "@element-plus/icons-vue";
const props = defineProps({
  searchFormConfig: {
    type: Object,
    reuqired: true
  }
});
const emit = defineEmits(["resetBtnClick", "queryBtnClick"]);
const formItems = props.searchFormConfig?.formItems ?? [];
const formOriginData: any = {};
for (const formItem of formItems) {
  formOriginData[`${formItem.field}`] = "";
}
const formData = ref(formOriginData);

function resetClick() {
  for (const key in formData.value) {
    formData.value[key] = "";
  }
  emit("resetBtnClick");
}
function queryClick() {
  emit("queryBtnClick", formData);
}
</script>

<style scoped>
.handle-btns {
  text-align: right;
  padding: 0 40px 20px 0;
}
</style>

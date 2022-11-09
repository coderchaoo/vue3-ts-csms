<template>
  <div class="page-search">
    <!-- v-bind="searchFormConfig"将searchFormConfig中的所有属性都绑定 -->
    <XcForm v-model="formData" v-bind="searchFormConfig">
      <!-- footer底部插槽内容 -->
      <template #footer>
        <div class="handle-btns">
          <el-button @click="resetClick" icon="Refresh">重置</el-button>
          <el-button @click="queryClick" type="primary" icon="Search"
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
// 创建表单数据对象，用来存储表单中填写的数据
const formData = ref(formOriginData);

function resetClick() {
  for (const key in formData.value) {
    formData.value[key] = "";
  }
  // 将事件发射出去，在使用的时候通过@resetBtnClick或@reset-btn-click都可监听
  emit("resetBtnClick");
}
function queryClick() {
  emit("queryBtnClick", formData.value);
}
</script>

<style scoped>
.handle-btns {
  text-align: right;
  padding: 0 40px 20px 0;
}
</style>

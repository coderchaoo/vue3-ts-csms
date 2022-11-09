<template>
  <div class="page-content">
    <XcTable
      v-bind="tableConfig"
      :data-list="pageDatas"
      size="large"
      :list-count="dataCount"
      v-model:page="pageInfo"
    >
      <!-- 1.header中的headerHandler插槽 -->
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          type="primary"
          size="default"
          icon="CirclePlus"
          >新建</el-button
        >
      </template>

      <!-- 将所有列再通过插槽传递给最外层组件定义，对于一些通用的列可以在插槽中给定默认值 -->
      <template
        v-for="columnConfig in contentTableConfig.propList"
        :key="columnConfig.prop"
        #[columnConfig.slotName]="slotProps"
      >
        <slot :name="columnConfig.slotName" :row="slotProps.row">
          <template v-if="columnConfig.slotName === 'status'">
            <!-- status状态列中的插槽，这里的slotProps为table中通过slot中:row传递过来的包装对象，名字随意 -->
            <el-button
              plain
              size="small"
              :type="slotProps.row.enable ? 'success' : 'danger'"
            >
              {{ slotProps.row.enable ? "启用" : "禁用" }}
            </el-button>
          </template>
          <template v-if="columnConfig.slotName === 'createAt'">
            <!-- $filters需要在shims-vue.d.ts中声明，不然编译会报错 -->
            <span>{{ $filters.formatTime(slotProps.row.createAt) }}</span>
          </template>
          <template v-if="columnConfig.slotName === 'updateAt'">
            <span>{{ $filters.formatTime(slotProps.row.updateAt) }}</span>
          </template>
          <!-- operation操作列中的插槽 -->
          <template v-if="columnConfig.slotName === 'handler'">
            <div class="handle-btns">
              <el-button
                class="btn-operation"
                v-if="isUpdate"
                icon="edit"
                size="small"
                text
                type="primary"
                >编辑</el-button
              >
              <el-button
                class="btn-operation"
                v-if="isDelete"
                icon="delete"
                size="small"
                text
                type="primary"
                >删除</el-button
              >
            </div>
          </template>
        </slot>
      </template>
    </XcTable>
  </div>
</template>

<script setup lang="ts">
import XcTable from "@/base-ui/table";
import { usePermission } from "@/hooks/use-permission";
import store from "@/store";
import { computed, defineProps, ref, watch, defineExpose } from "vue";

const props = defineProps({
  contentTableConfig: {
    type: Object,
    default() {
      return [];
    }
  },
  pageName: {
    type: String,
    required: true
  }
});
// 获取相应权限
const isCreate = usePermission(props.pageName, "create");
const isUpdate = usePermission(props.pageName, "update");
const isDelete = usePermission(props.pageName, "delete");
const isQuery = usePermission(props.pageName, "query");

// 1.双向绑定pageInfo
const pageInfo = ref({ currentPage: 0, pageSize: 10 });
watch(pageInfo, () => getPageData());
// 2.发送网络请求，当pageInfo中的数据发生改变时会自动重新发送
const getPageData = (queryInfo: any = {}) => {
  if (!isQuery) return;
  store.dispatch("system/getPageListAction", {
    pageName: props.pageName,
    queryInfo: {
      offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo
    }
  });
};
getPageData();
const pageDatas = computed(() =>
  store.getters[`system/pageListData`](props.pageName)
);
const dataCount = computed(() =>
  store.getters[`system/pageListCount`](props.pageName)
);
const tableConfig = ref(props.contentTableConfig);

defineExpose({
  getPageData
});
</script>

<style scoped>
.page-content {
  background-color: white;
}
.btn-operation {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
</style>

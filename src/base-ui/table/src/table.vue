<template>
  <div class="table">
    <!-- 头部插槽 -->
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <!-- 表格内容，dataList是通过接口请求到的实际数据，其中的字段名称需要和propList中的字段名称一一对应 -->
    <el-table
      :data="dataList"
      :stripe="stripe"
      :border="border"
      :size="size"
      v-bind="childrenProps"
      :fit="fit"
      :highlightCurrentRow="highlightCurrentRow"
      @selection-change="handleSelectionChange"
    >
      <!-- 选择列和序号列 -->
      <el-table-column
        v-if="isShowSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="isShowIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <!-- 数据列，propList是通过content.config.ts中的内容传递过来的列数据 -->
      <el-table-column
        v-for="columnConfig in propList"
        :key="columnConfig.prop"
        align="center"
        v-bind="columnConfig"
        show-overflow-tooltip
      >
        <!-- 这里的scope是el-table-column组件内部通过插槽提供的值 -->
        <template #default="scope">
          <!-- 这里将row这一行的数据暴露出去，供外层组件可以访问到这一行的数据，row将被包装到一个对象中 -->
          <slot :name="columnConfig.slotName" :row="scope.row">
            <!-- 通过设置name属性变为具名插槽，如果没有则显示默认值内容 -->
            {{ scope.row[columnConfig.prop] }}
          </slot>
        </template>
      </el-table-column>
    </el-table>
    <!-- 尾部插槽 -->
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage + 1"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, PropType } from "vue";
import { ITableColumnConfig, tableSizeType } from "../types";

const props = defineProps({
  height: {
    type: String || Number,
    default: ""
  },
  maxHeight: {
    type: String || Number,
    default: ""
  },
  stripe: {
    type: Boolean,
    default: true
  },
  border: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<tableSizeType>, // large / default /small
    default: "default"
  },
  fit: {
    type: Boolean,
    default: true
  },
  highlightCurrentRow: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ""
  },
  listCount: {
    type: Number,
    default: 0
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  page: {
    type: Object,
    default: () => ({ currentPage: 0, pageSize: 10 })
  },
  propList: {
    type: Array as PropType<ITableColumnConfig[]>,
    default() {
      return [];
    }
  },
  dataList: {
    type: Array,
    default() {
      return [];
    }
  },
  isShowSelectColumn: {
    type: Boolean,
    default: false
  },
  isShowIndexColumn: {
    type: Boolean,
    default: false
  },
  childrenProps: {
    type: Object,
    default: () => ({})
  }
});
const emit = defineEmits(["selectionChange", "update:page"]);

/* 选中某行数据监听 */
const handleSelectionChange = (value: any) => {
  console.log("handleSelectionChange", value);
  emit("selectionChange", value);
};

/* 底部页码发生变化事件监听 */
const handleCurrentChange = (currentPage: number) => {
  console.log("handleCurrentChange", currentPage);
  emit("update:page", { ...props.page, currentPage: currentPage - 1 });
};

/* 底部每页数量发生变化事件监听 */
const handleSizeChange = (pageSize: number) => {
  console.log("handleSizeChange", pageSize);
  emit("update:page", { ...props.page, pageSize });
};
</script>

<style scoped lang="less">
.table {
  padding: 0px 10px;
  padding-bottom: 15px;
  .header {
    display: flex;
    padding: 10px;
    margin-top: 15px;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 20px;
      font-weight: 700;
    }

    .handler {
      align-items: center;
    }
  }

  .footer {
    margin-top: 0px;
    display: flex;
    padding: 10px 5px 0px 0px;
    justify-content: flex-end;
  }
}
</style>

<template>
  <div class="table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="dataList"
      :stripe="stripe"
      :border="border"
      :size="size"
      :fit="fit"
      :highlightCurrentRow="highlightCurrentRow"
      @selection-change="handleSelectionChange"
    >
      <!-- 是否显示选择列和序号列 -->
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
      <!-- 数据列 -->
      <el-table-column
        v-for="columnConfig in propList"
        :key="columnConfig.prop"
        align="center"
        v-bind="columnConfig"
      ></el-table-column>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
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
import { defineProps, PropType, defineEmits } from "vue";
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
  }
});
const emit = defineEmits(["selectionChange", "update:page"]);

const handleSelectionChange = (value: any) => {
  console.log("handleSelectionChange");
  emit("selectionChange", value);
};

const handleCurrentChange = (currentPage: number) => {
  console.log("handleCurrentChange");
  emit("update:page", { ...props.page, currentPage });
};

const handleSizeChange = (pageSize: number) => {
  console.log("handleSizeChange");
  emit("update:page", { ...props.page, pageSize });
};
</script>

<style scoped lang="less">
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
  padding: 5px;
  justify-content: flex-end;
}
</style>

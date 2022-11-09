<template>
  <div class="goods">
    <PageContent :content-table-config="contentTableConfig" page-name="goods">
      <template #status="slotProps">
        <el-button
          plain
          size="small"
          :type="slotProps.row.status ? 'success' : 'danger'"
        >
          {{ slotProps.row.status ? "启用" : "禁用" }}
        </el-button>
      </template>
      <template #oldPrice="slotProps">
        ￥{{ slotProps.row.oldPrice }}
      </template>
      <template #newPrice="slotProps">
        ￥{{ slotProps.row.newPrice }}
      </template>
      <template #image="slotProps">
        <el-image
          style="height: 60px"
          :src="slotProps.row.imgUrl"
          preview-teleported
          lazy
          :preview-src-list="[slotProps.row.imgUrl]"
        >
          <template #placeholder>
            <img
              class="img-placeholder"
              src="@/assets/img/loading.svg"
              alt="aaa"
            />
          </template>
        </el-image>
      </template>
    </PageContent>
  </div>
</template>

<script lang="ts" setup>
import PageContent from "@/components/page-content";
// 配置文件
import { contentTableConfig } from "./config/content.config";
</script>

<style scoped lang="less">
@keyframes changeRight {
  0% {
    -webkit-transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
.img-placeholder {
  animation: changeRight 2s linear infinite;
}
</style>

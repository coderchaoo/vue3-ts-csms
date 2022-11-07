<template>
  <div class="nav-header">
    <el-icon @click="handleFoldClick" size="28px" v-if="!store.state.isFold"
      ><Fold
    /></el-icon>
    <el-icon @click="handleFoldClick" size="28px" v-else><Expand /></el-icon>
    <XcBreadCrumb :breadcrumbs="breadcrumbs" />
    <div class="userinfo">
      <UserInfo />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store";
import XcBreadCrumb from "@/base-ui/breadcrumb";
import UserInfo from "./user-info.vue";
import { computed } from "vue";
import { pathMapToBreadcrumb } from "@/utils/map-menu";
import { useRoute } from "vue-router";
const store = useStore();
const handleFoldClick = () => {
  store.commit("changeIsFold", !store.state.isFold);
};
const breadcrumbs = computed(() => {
  const userMenus = store.state.login.userMenus;
  const route = useRoute();
  return pathMapToBreadcrumb(userMenus, route.path);
});
</script>

<style scoped>
.nav-header {
  height: 100%;
  width: 100%;
  display: flex;
  align-content: center;
}
.el-icon {
  height: 100%;
  cursor: pointer;
}

.header-breadcrumb {
  width: 100%;
  display: flex;
  align-items: center;
  margin-left: 15px;
}
.userinfo {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: right;
}
</style>

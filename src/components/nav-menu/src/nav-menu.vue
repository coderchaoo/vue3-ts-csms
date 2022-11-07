<template>
  <!-- <div class="nav-menu"> -->
  <el-menu
    :default-active="defaultActive"
    class="el-menu-vertical nav-menu"
    :collapse="$store.state.isFold"
    background-color="#0c2135"
    text-color="#b7bdc3"
    active-text-color="#0a60bd"
  >
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!$store.state.isFold" class="title">Vue3+TS</span>
    </div>
    <template v-for="item in userMenus" :key="item.id">
      <!-- 二级菜单 -->
      <template v-if="item.type === 1">
        <!-- 二级菜单的可以展开的标题 -->
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <!-- <i v-if="item.icon" :class="item.icon"></i> -->
            <el-icon v-if="item.icon">
              <component class="fold-menu" v-bind:is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <!-- 遍历里面的item -->
          <template v-for="subitem in item.children" :key="subitem.id">
            <el-menu-item
              :index="subitem.id + ''"
              @click="handleMenuItemClick(subitem)"
            >
              <!-- <i v-if="subitem.icon" :class="subitem.icon"></i> -->
              <el-icon v-if="subitem.icon">
                <component
                  class="fold-menu"
                  v-bind:is="subitem.icon"
                ></component>
              </el-icon>
              <span>{{ subitem.name }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
      <!-- 一级菜单 -->
      <template v-else-if="item.type === 2">
        <el-menu-item :index="item.id + ''">
          <!-- <i v-if="item.icon" :class="item.icon"></i> -->
          <el-icon v-if="item.icon">
            <component class="fold-menu" v-bind:is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
  <!-- </div> -->
</template>

<script lang="ts" setup>
import router from "@/router";
import { useStore } from "@/store";
import { pathMapToMenu } from "@/utils/map-menu";
import { ref } from "vue";

// vuex - typescript  => piniae

const store = useStore();

const userMenus = store.state.login.userMenus;
const defaultMenu = pathMapToMenu(userMenus, router.currentRoute.value.path);
const defaultActive = ref(defaultMenu.id + "");

/* 这里核心逻辑是将接口返回的el-icon-iconName的图标类名转为IconName格式，因为ElementPlus引入图标的方式变了 */
for (let i = 0; i < userMenus.length; i++) {
  const classs = userMenus[i].icon.split("-");
  classs.splice(0, 2);
  for (let j = 0; j < classs.length; j++) {
    let word = classs[j];
    let newWord = word.replace(word[0], word[0].toUpperCase());
    classs[j] = newWord;
  }
  // console.log(classs);
  userMenus[i].icon = classs.join("");
}

function handleMenuItemClick(menu: any) {
  // console.log(menu.url);
  router.push({
    path: menu.url ?? "/404"
  });
}
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: thin;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-sub-menu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
/* 滚动条相关样式 */

.nav-menu::-webkit-scrollbar {
  width: 0px;
}
.nav-menu::-webkit-scrollbar-track {
  background: #001529;
  border-radius: 0px;
}

.nav-menu::-webkit-scrollbar-thumb {
  background: rgb(136, 136, 136);
  border-radius: 5px;
}

.nav-menu::-webkit-scrollbar-thumb:hover {
  background: rgb(100, 100, 100);
  border-radius: 5px;
}

.nav-menu::-webkit-scrollbar-thumb:active {
  background: rgb(68, 68, 68);
  border-radius: 5px;
}
</style>

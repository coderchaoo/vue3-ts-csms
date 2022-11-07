import {
  ElButton,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElAside,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElRow,
  ElCol,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElConfigProvider,
  ElTable,
  ElTableColumn,
  ElPagination
} from "element-plus";
import { App } from "vue";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

export function registerElementPlus(rootApp: App) {
  // 全局注册ElementPlus组件
  const components = [
    ElButton,
    ElTabs,
    ElTabPane,
    ElIcon,
    ElForm,
    ElFormItem,
    ElInput,
    ElSelect,
    ElOption,
    ElDatePicker,
    ElCheckbox,
    ElLink,
    ElContainer,
    ElHeader,
    ElAside,
    ElMain,
    ElMenu,
    ElSubMenu,
    ElMenuItem,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElRow,
    ElCol,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElAvatar,
    ElConfigProvider,
    ElTable,
    ElTableColumn,
    ElPagination
  ];
  for (const component of components) {
    rootApp.component(component.name, component);
  }

  /* 注册icon */
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    rootApp.component(key, component);
  }
}

/* eslint-disable */

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  import { Store } from "@/store"; // path to store file

  const component: DefineComponent<{}, {}, any>;

  // /* MARK 为了能正常使用$store不报错需要在这里申明一下 */
  declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
      $store: Store;
      $filters: any;
    }
  }
  export default component;
}

declare module "element-plus/dist/locale/zh-cn.mjs";

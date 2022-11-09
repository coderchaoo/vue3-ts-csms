import { registerElementPlus } from "./register-element-plus";
import { App } from "vue";
import registerProperties from "./register-properties";
export default function (rootApp: App) {
  // registerElementPlus(rootApp); 这种方式与下面使用use是一样的
  rootApp.use(registerElementPlus);
  rootApp.use(registerProperties);
}

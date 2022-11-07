import { registerElementPlus } from "./register-element-plus";
import { App } from "vue";
export default function (rootApp: App) {
  registerElementPlus(rootApp);
}

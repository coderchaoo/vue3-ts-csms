import "@/assets/css/base.css";
import { setupStore } from "@/store";
import { createApp } from "vue";
import App from "./App.vue";
import globalRegistration from "./global";
import router from "./router";
import store from "./store";
const rootApp = createApp(App);

// 该方式和直接调用globalRegistration(rootApp)一样，默认会自动执行传入的函数并传入rootApp参数
rootApp.use(globalRegistration);

setupStore(); // 初始化store中的数据，这里面有初始化动态路由，需要放到use(router)前面，不然会造成刷新的时候出现404
rootApp.use(router);

rootApp.use(store);

rootApp.mount("#app");

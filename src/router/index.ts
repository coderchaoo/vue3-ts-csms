import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import localCache from "@/utils/cache";
import { firstMenu } from "@/utils/map-menu";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("views/login/login.vue")
  },
  {
    path: "/main",
    name: "main",
    component: () => import("views/main/main.vue")
  },
  {
    path: "/:pathMacth(.*)*",
    name: "404",
    component: () => import("views/404/404.vue")
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

router.beforeEach((to, from) => {
  // console.log(router.getRoutes());
  // console.log(to);
  if (to.path !== "/login") {
    // 如果token为空，则跳转到登录页面
    // console.log(router.getRoutes());
    const token = localCache.getCache("token");
    if (!token) {
      return "/login";
    }
  }
  /* TAG /main路由找不到对应的页面，跳转到第一个有对应路由的页面 */
  if (to.path === "/main") {
    console.log("主页面", firstMenu);
    return firstMenu.url;
  }
});
export default router;

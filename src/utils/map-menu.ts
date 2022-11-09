import { IBreadCrumb } from "@/base-ui/breadcrumb/types";
import { RouteRecordRaw } from "vue-router";
let firstMenu: any = null;
/**
 *
 * @param userMenus 将接口返回的菜单注册成路由
 * @returns 动态路由
 */
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  const allRoutes: RouteRecordRaw[] = [];
  const routeFiles = require.context("../router/main", true, /\.ts/);
  // console.log("routeFiles", routeFiles.keys());
  // 将所有路由添加到allRoutes数组中
  routeFiles.keys().forEach((key) => {
    const route = require("../router/main" + key.split(".")[1]);
    /* MARK 这里添加的是route.default */
    allRoutes.push(route.default);
  });

  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        // 根据菜单动态获取需要的route
        const route = allRoutes.find((route) => {
          return route.path === menu.url;
        });
        if (route) routes.push(route);
        if (!firstMenu) {
          firstMenu = menu;
        }
      } else {
        _recurseGetRoute(menu.children);
      }
    }
  };
  _recurseGetRoute(userMenus);
  return routes;
}

export function pathMapToBreadcrumb(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadCrumb[] = [];
  pathMapToMenu(userMenus, currentPath, breadcrumbs);
  return breadcrumbs;
}

export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadCrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name });
        breadcrumbs?.push({ name: findMenu.name });
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      breadcrumbs?.push({ name: menu.name });
      return menu;
    }
  }
}

/* 获取用户操作权限 */
export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = [];

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? []);
      } else if (menu.type === 3) {
        permissions.push(menu.permission);
      }
    }
  };
  _recurseGetPermission(userMenus);

  return permissions;
}

export { firstMenu };

import router from "@/router";
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from "@/service/login/login";
import localCache from "@/utils/cache";
import { mapMenusToPermissions, mapMenusToRoutes } from "@/utils/map-menu";
import { Module } from "vuex";
import { IRootState } from "../types";
import { ILoginState } from "./types";

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      loading: false,
      permissions: []
    };
  },
  mutations: {
    changeLoading(state, loading) {
      state.loading = loading;
    },
    changeToken(state, token) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;
      // 动态添加路由
      const routes = mapMenusToRoutes(userMenus);
      // console.log("动态添加路由", routes, userMenus);
      routes.forEach((route) => {
        router.addRoute("main", route);
      });

      // 获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus);
      state.permissions = permissions;
    }
  },
  getters: {},
  actions: {
    async accountLoginAction({ commit }, payload: any) {
      commit("changeLoading", true);
      const rememberPassword = payload.rememberPassword;
      // 调用登录接口
      try {
        const loginResult = await accountLoginRequest(payload.data);
        const { id, token } = loginResult.data;
        localCache.setCache("token", token);
        // 改变state中数据的值一定要commit提交mutations
        commit("changeToken", token);

        // 2.请求用户信息
        const userInfoResult = await requestUserInfoById(id);
        const userInfo = userInfoResult.data;
        commit("changeUserInfo", userInfo);
        localCache.setCache("userInfo", userInfo);

        // 3.请求用户菜单
        const userMenusResult = await requestUserMenusByRoleId(
          userInfo.role.id
        );
        const userMenus = userMenusResult.data;
        commit("changeUserMenus", userMenus);
        localCache.setCache("userMenus", userMenus);

        // 改变登录loading状态
        commit("changeLoading", false);

        if (rememberPassword) {
          // 登录成功，保存密码
          localCache.setCache("name", payload.data.name);
          localCache.setCache("password", payload.data.password);
        } else {
          // 清除密码
          localCache.deleteCache("name");
          localCache.deleteCache("password");
        }
        router.replace("/main");
      } catch (error) {
        // 改变登录loading状态
        commit("changeLoading", false);
      }
    },
    // 因为每次刷新后store中state中数据会被清空，所以需要这里重新设置一下
    loadLocalLoginInfo({ commit }) {
      const token = localCache.getCache("token");
      if (token) {
        commit("changeToken", token);
      }
      const userInfo = localCache.getCache("userInfo");
      if (userInfo) {
        commit("changeUserInfo", userInfo);
      }
      const userMenus = localCache.getCache("userMenus");
      if (userMenus) {
        commit("changeUserMenus", userMenus);
      }
    }
  },
  modules: {}
};

export default loginModule;

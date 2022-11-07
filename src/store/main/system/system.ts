import { Module } from "vuex";
import { IRootState } from "@/store/types";
import { ISystemState } from "./types";

import { requestPageListData } from "@/service/main/system/system";

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0
    };
  },
  getters: {
    getPageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
        // switch (pageName) {
        //   case 'users':
        //     return state.usersList
        //   case 'role':
        //     return state.roleList
        // }
      };
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList;
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount;
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list;
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count;
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.获取pageUrl
      const pageName = payload.pageName;
      const pageUrl = `/${pageName}/list`;
      // 2.对页面发送请求
      const pageResult = await requestPageListData(pageUrl, payload.queryInfo);
      // 3.将数据存储到state中
      const { list, totalCount } = pageResult.data;
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1);
      commit(`change${changePageName}List`, list);
      commit(`change${changePageName}Count`, totalCount);
    }
  }
};

export default systemModule;
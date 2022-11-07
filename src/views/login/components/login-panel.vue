<template>
  <div class="login-panel">
    <h2>后台管理系统</h2>

    <el-tabs
      type="border-card"
      style="width: 100%"
      stretch
      v-model="currentTab"
    >
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><User /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account
          ref="accountRef"
          class="login-panel-child"
        ></login-account>
      </el-tab-pane>

      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机号登录</span>
          </span>
        </template>
        <login-phone ref="phoneRef" class="login-panel-child"></login-phone>
      </el-tab-pane>
    </el-tabs>

    <div class="login-bottom">
      <el-checkbox v-model="rememberPassword">己住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button
      type="primary"
      :loading="$store.state.login.loading"
      class="btn-login"
      size="large"
      @click="handleLoginClick"
      >登录</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { User, Iphone } from "@element-plus/icons-vue";
import LoginAccount from "./login-account.vue";
import LoginPhone from "./login-phone.vue";
import { ref } from "vue";

const rememberPassword = ref(true);
const currentTab = ref("account");

const accountRef = ref<InstanceType<typeof LoginAccount>>();
const phoneRef = ref<InstanceType<typeof LoginPhone>>();

function handleLoginClick() {
  switch (currentTab.value) {
    case "account":
      accountRef.value?.accountLoginAction(rememberPassword.value);
      break;
    case "phone":
      phoneRef.value?.phoneLoginAction();
      break;
  }
}
</script>

<style scoped lang="less">
.login-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 150px;
  width: 320px;
}
.custom-tabs-label {
  display: flex;
  align-items: center;
  justify-content: center;
}
.custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}

.login-panel-child {
  padding: 8px 12px 0px 12px;
}

.login-bottom {
  width: 100%;
  display: flex;
  margin: 5px 0px;
  justify-content: space-between;
}

.btn-login {
  width: 100%;
}
/* MARK 修改element-plus需要使用:deep，否则修改无效，这里是为了去掉手机号登录右边多了一条竖线分割线 */
.login-panel
  > :deep(.el-tabs--border-card
    > .el-tabs__header
    .el-tabs__item.is-active:last-child) {
  border-right-color: #00000000 !important;
}
</style>

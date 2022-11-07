<template>
  <div class="login-account">
    <!-- model属性用来绑定表单数据，这里即登录接口需要的参数类型 -->
    <el-form :model="accountData" :rules="accountRules" ref="formRef">
      <!-- prop属性用来匹配rules中的规则 -->
      <el-form-item label="账号" prop="name">
        <el-input placeholder="" v-model="accountData.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          placeholder=""
          v-model="accountData.password"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import localCache from "@/utils/cache";
import { FormInstance } from "element-plus";
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { accountRules } from "../config/account-config";

const store = useStore();

/* model绑定的对象，即表单数据对象 */
const accountData = reactive({
  name: localCache.getCache("name"),
  password: localCache.getCache("password")
});

const formRef = ref<FormInstance>();

const accountLoginAction = (rememberPassword: boolean) => {
  formRef.value?.validate((isValid) => {
    if (isValid) {
      // 这里accountData对象再解构一遍的原因是不要将响应式对象传递过去
      store.dispatch("login/accountLoginAction", {
        data: { ...accountData },
        rememberPassword
      });
    }
  });
};

/* MARK 这里eslint检测失败，需要以下注释去除检测。defineExpose中定义的内容是要向外暴露出去的 */
// eslint-disable-next-line no-undef
defineExpose({
  accountLoginAction
});
</script>

<style scoped></style>

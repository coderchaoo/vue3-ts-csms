<template>
  <div class="login-phone">
    <el-form :model="phoneData" :rules="phoneRules" ref="formRef">
      <el-form-item label="手机号" prop="phone">
        <el-input placeholder="" v-model="phoneData.phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="form-item-code">
          <el-input placeholder="" v-model="phoneData.code"></el-input>
          <el-button
            type="primary"
            class="btn-get-code"
            @click="getCode(formRef)"
            :disabled="isDisable"
            >{{ btnText }}</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { FormInstance } from "element-plus";
import { reactive, ref } from "vue";
import { phoneRules } from "../config/account-config";

const phoneData = reactive({
  phone: "",
  code: ""
});

let isDisable = ref(false);
const resendTime = 60;
let seconds = resendTime;
let btnText = ref("获取验证码");

const formRef = ref<FormInstance>();

/**
 * 这里的formEl即为formRef，通过参数传进来方便将这方法封装到其他地方
 */
function getCode(formEl: FormInstance | undefined) {
  if (!formEl) {
    return;
  }
  formEl.validateField(["phone"], (isValid) => {
    if (!isValid) {
      return false;
    } else {
      // 验证通过，获取验证码
      btnText.value = `${seconds--} s`;
      isDisable.value = true;
      const interval = setInterval(() => {
        if (seconds <= 0) {
          btnText.value = "获取验证码";
          isDisable.value = false;
          seconds = resendTime;
          clearInterval(interval);
          return;
        }
        btnText.value = `${seconds--} s`;
      }, 1000);
    }
  });
}

function phoneLoginAction() {
  formRef.value?.validate((isValid) => {
    if (isValid) {
      console.log("手机号开始真正登录");
    }
  });
}

// eslint-disable-next-line no-undef
defineExpose({
  phoneLoginAction
});
</script>

<style scoped>
.form-item-code {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.btn-get-code {
  margin-left: 8px;
  width: 88px;
}
</style>

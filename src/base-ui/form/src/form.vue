<template>
  <div class="form">
    <!-- 头部插槽 -->
    <slot name="header"></slot>

    <el-form :label-width="labelWidth" :style="itemLayout">
      <el-row :gutter="gutter">
        <template v-for="formItem in formItems" :key="formItem.label">
          <el-col v-bind="colLayout">
            <el-form-item :label="formItem.label" :rules="formItem.rules">
              <!-- 类型为输入框 -->
              <template
                v-if="formItem.type === 'input' || formItem.type === 'password'"
              >
                <el-input
                  v-model="formData[`${formItem.field}`]"
                  :placeholder="formItem.placeholder"
                  :show-password="formItem.type === 'password'"
                ></el-input>
              </template>
              <!-- 类型为选择器 -->
              <template v-else-if="formItem.type === 'select'">
                <el-select
                  v-model="formData[`${formItem.field}`]"
                  :placeholder="formItem.placeholder"
                  v-bind="formItem.otherOptions"
                  style="width: 100%"
                >
                  <el-option
                    v-for="option in formItem.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <!-- 类型为日期选择器 -->
              <template v-else-if="formItem.type === 'datepicker'">
                <el-date-picker
                  v-model="formData[`${formItem.field}`]"
                  style="width: 100%"
                  v-bind="formItem.otherOptions"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 底部插槽 -->
    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType, ref, watch } from "vue";
import { IFormItem } from "../types";
const props = defineProps({
  /* TAG 通过v-model绑定的属性 */
  modelValue: {
    type: Object,
    required: true
  },
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => []
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6, // >1920px 4个
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24
    })
  },
  itemLayout: {
    type: Object,
    default() {
      return { padding: "10px 40px" };
    }
  },
  gutter: {
    type: Number,
    default: 24
  },
  labelWidth: {
    type: String,
    default: "100px"
  }
});
const formData = ref({ ...props.modelValue });
const emit = defineEmits(["update:modelValue"]);
watch(
  formData,
  (newValue) => {
    /* TAG 获取到新值，通过事件重新发送给上层组件
           不要直接修改props.modelValue的值，vue中不推荐直接这样改，因为这样改会直接导致上层组件中的formData的值发生变化，不容易维护
    */
    emit("update:modelValue", newValue);
  },
  { deep: true }
);
</script>

<style scoped lang="less">
.form {
  background-color: white;
  padding-top: 22px;
}
.footer {
  padding-bottom: 22px;
}
</style>

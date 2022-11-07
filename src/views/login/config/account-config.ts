import { reactive } from "vue";
export const accountRules = reactive({
  /* 校验规则根据el-form-item的prop属性匹配 */
  name: [
    { required: true, message: "账号不能为空", trigger: "blur" },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: "账号必须是5~10个字母或者数字~",
      trigger: "blur"
    }
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: "密码必须是3位或以上的字母或者数字~",
      trigger: "blur"
    }
  ]
});

export const phoneRules = reactive({
  /* 校验规则根据el-form-item的prop属性匹配 */
  phone: [
    { required: true, message: "手机号不能为空", trigger: "blur" },
    {
      pattern:
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
      message: "手机号格式不正确，请重新输入",
      trigger: "blur"
    }
  ],
  code: [
    { required: true, message: "验证码不能为空", trigger: "blur" },
    {
      pattern: /^[0-9]{6,6}$/,
      message: "验证码格式不正确，验证码为6为数字",
      trigger: "blur"
    }
  ]
});

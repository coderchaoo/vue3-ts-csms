<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>

<script lang="ts" setup>
import LoginPanel from "./components/login-panel.vue";
</script>

<style scoped>
.login {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: url(@/assets/img/login-bg.svg);
}
</style>

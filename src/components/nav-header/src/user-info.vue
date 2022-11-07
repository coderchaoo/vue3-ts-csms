<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <span class="name">{{ name }}</span>
        <el-avatar
          size="small"
          src="https://chi01pap001files.storage.live.com/y4msum1WG3PTO2HzZLyAs1XwzTIYCIXxm8pRf8VODQZ-gbro_mX4KzneGjzzK4WtpsqCkTXWg7w03zYYhly8_F3T0tS1ej7u3wZm5f-NOeY8LsJE1UejzawMuaeJxbZAuI3Yz0wNmxxOsSLJznYfSpudJOPqmW_i8dSJslk8qid9fSBbOkkHbe31dh7lb55IOCQ?width=300&height=300&cropmode=none"
        ></el-avatar>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>用户信息</el-dropdown-item>
          <el-dropdown-item divided>系统管理</el-dropdown-item>
          <el-dropdown-item
            divided
            :style="{ color: 'red', fontWeight: 'bold' }"
          >
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/store";
const store = useStore();
const name = computed(() => store.state.login.userInfo.name);
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  .name {
    margin-right: 10px;
    font-weight: bold;
  }
}
</style>

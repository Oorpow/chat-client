<script setup lang="ts">
const tabbarList = [
  { icon: 'chat-o', name: '聊天', to: '/chat' },
  { icon: 'friends-o', name: '通讯录', to: '/directory' },
  { icon: 'manager-o', name: '我', to: '/my' }
]
</script>

<template>
  <van-tabbar route>
    <van-tabbar-item
      v-for="tabbarItem in tabbarList"
      :key="tabbarItem.name"
      :icon="tabbarItem.icon"
      :to="tabbarItem.to"
      >{{ tabbarItem.name }}</van-tabbar-item
    >
  </van-tabbar>
</template>

<style scoped></style>

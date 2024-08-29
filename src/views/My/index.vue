<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
</script>

<template>
  <div>
    <div class="flex gap-2 p-4 bg-white">
      <Avatar :src="userInfo?.avatar" />
      <span>{{ userInfo?.username }}</span>
    </div>

    <!-- floor组件 -->
    <div class="flex flex-col gap-4 mt-4">
      <div class="flex items-center gap-2 p-4 bg-white">
        <van-icon name="setting-o" />
        <span class="text-lg">设置</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { getAllChat } from '@/api/chat'

getAllChat().then((res) => {
  console.log(res)
})

const searchChat = ref('')
// 搜索聊天
async function handleSearchChat(value: string) {
  console.log(value)
}
const debounceSearch = useDebounceFn(handleSearchChat, 1000)
</script>

<template>
  <div>
    <div class="">
      <div class="flex p-2">
        <div class="flex justify-center flex-1">
          <span>聊天(4)</span>
        </div>
        <div class="">
          <van-icon name="add-o" />
        </div>
      </div>

      <!-- search -->
      <div class="w-full">
        <van-search
          style="--van-search-content-background: #fff; background: none"
          v-model="searchChat"
          placeholder="搜索"
          @update:model-value="debounceSearch"
        />
      </div>
    </div>
    <!-- chatroom list -->
    <div class="overflow-auto bg-white mb-[40px]" style="height: calc(100vh - 52px - 91px)">
      <!-- chatItem -->
      <div
        class="flex justify-between p-3 bg-white border-b border-gray-100"
        v-for="item in 10"
        :key="item"
      >
        <div class="flex gap-2">
          <Avatar :width="50" />
          <div class="flex flex-col">
            <span>Oorpow</span>
            <span class="text-sm text-gray-300">oorpow: 我我我我我</span>
          </div>
        </div>
        <div>
          <span class="text-sm text-gray-300">15:48</span>
        </div>
      </div>
    </div>
  </div>
</template>

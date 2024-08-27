<script setup lang="ts">
import { ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { getFriendshipList, searchFriendByUsername } from '@/api/friend'
import { createDirectory } from '@/utils/directory'

const directory = ref<Map<string, string[]> | null>(null)

// 构造通讯录数据结构
function makeDirectoryData(nameList: string[]) {
  const directoryMap = createDirectory(nameList)
  directory.value = directoryMap
}

// 获取通讯录
async function getDirectory() {
  const { data } = await getFriendshipList()
  const nameList = data.map((friend) => friend.username)
  makeDirectoryData(nameList)
}

getDirectory()

const searchValue = ref('')

// 搜索好友，通讯录过滤
async function handleSearchUser(value: string) {
  const { data } = await searchFriendByUsername({ username: value })
  const nameList = data.map((friend) => friend.username)
  makeDirectoryData(nameList)
}

// 针对搜索做防抖处理
const debounceSearch = useDebounceFn(handleSearchUser, 1000)
</script>

<template>
  <div>
    <van-search v-model="searchValue" placeholder="搜索好友" @update:model-value="debounceSearch" />
    <van-index-bar>
      <template v-for="[key, value] in directory" :key="key">
        <van-index-anchor :index="key" />
        <van-cell :title="name" v-for="name in value" :key="name" />
      </template>
    </van-index-bar>
  </div>
</template>

<style lang="scss" scoped></style>

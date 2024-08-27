<script setup lang="ts">
import { ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { getFriendshipList } from '@/api/friend'
import { createDirectory } from '@/utils/directory'

const searchValue = ref('')

function handleSearchUser(value: string) {
  // TODO 发送请求，过滤通讯录
  console.log(value)
}

const debounceSearch = useDebounceFn(handleSearchUser, 1000)

const directory = ref(null)

// 获取通讯录
async function getDirectory() {
  const { data } = await getFriendshipList()
  // 将通讯录里的名字，摘出来，交给拼音进行处理，按照首字母进行分组、排序
  const nameList = data.map((friend) => friend.username)
  const directoryMap = createDirectory(nameList)
  directory.value = directoryMap
}

getDirectory()
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

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'
import { getFriendshipList, searchFriendByUsername } from '@/api/friend'
import { createDirectory, DirectoryUserList } from '@/utils/directory'

const router = useRouter()
const directory = ref<Map<string, DirectoryUserList[]> | null>(null)

// 构造通讯录数据结构
function makeDirectoryData(directoryList: DirectoryUserList[]) {
  const directoryMap = createDirectory(directoryList)
  directory.value = directoryMap
}

// 获取通讯录
async function getDirectory() {
  const { data } = await getFriendshipList()
  const directoryList = data.map((friend) => ({ id: friend.id, name: friend.username }))
  makeDirectoryData(directoryList)
}
getDirectory()

const searchValue = ref('')

// 搜索好友，通讯录过滤
async function handleSearchUser(value: string) {
  const { data } = await searchFriendByUsername({ username: value })
  const directoryList = data.map((friend) => ({ id: friend.id, name: friend.username }))
  makeDirectoryData(directoryList)
}

// 针对搜索做防抖处理
const debounceSearch = useDebounceFn(handleSearchUser, 1000)

/**
 * 页面跳转至用户名片页
 * @param id 用户id
 */
function handleCheckBusinessCard(id: number) {
  router.push({
    path: '/child/business-card',
    query: {
      id
    }
  })
}
</script>

<template>
  <div>
    <van-search v-model="searchValue" placeholder="搜索好友" @update:model-value="debounceSearch" />
    <van-index-bar>
      <template v-for="[key, group] in directory" :key="key">
        <van-index-anchor :index="key" />
        <van-cell
          :title="user.name"
          v-for="user in group"
          :key="user.id"
          @click="handleCheckBusinessCard(user.id)"
        />
      </template>
    </van-index-bar>
  </div>
</template>

<style lang="scss" scoped></style>

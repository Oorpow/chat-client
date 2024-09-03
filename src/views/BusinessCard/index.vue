<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { checkBusinessCardById } from '@/api/user'

const route = useRoute()

const businessCardInfo = ref<API.BusinessCardInfo | null>(null)
async function getBusinessCardInfo() {
  const businessCardRes = await checkBusinessCardById({ id: route.query.id as string })
  businessCardInfo.value = businessCardRes.data
}
getBusinessCardInfo()

function backToLastPage() {
  history.back()
}

function onClickRight() {
  console.log('clicked')
}
</script>

<template>
  <van-nav-bar left-arrow @click-left="backToLastPage">
    <template #right>
      <van-icon name="ellipsis" @click="onClickRight" />
    </template>
  </van-nav-bar>
  <div class="p-4">
    <div class="flex gap-2">
      <Avatar :width="80" />
      <span>{{ businessCardInfo?.username }}</span>
    </div>
    <div class="mt-3">
      <VanButton size="large" type="primary">发消息</VanButton>
    </div>
  </div>
</template>

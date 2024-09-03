<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.query)

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
  <div class="p-4">聊天界面</div>
</template>

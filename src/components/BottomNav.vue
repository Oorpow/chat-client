<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const active = ref('chat')

const tabList = [
  { path: '/chat', name: 'chat', icon: 'chat-processing-outline', label: '消息' },
  { path: '/directory', name: 'directory', icon: 'account-supervisor-outline', label: '通讯录' },
  { path: '/my', name: 'my', icon: 'account-circle-outline', label: '我' }
]

function handleChangeTab(active) {
  router.push({ name: active })
}
</script>

<template>
  <var-bottom-navigation v-model:active="active" fixed @change="handleChangeTab">
    <var-bottom-navigation-item
      :name="tab.name"
      :label="tab.label"
      :icon="tab.icon"
      :key="tab.path"
      v-for="tab in tabList"
    />
  </var-bottom-navigation>
</template>

<style scoped></style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { checkBusinessCardById } from '@/api/user'
import { getFriendshipList, sendFriendshipRequest } from '@/api/friend'
import { getOneToOneChatHistory, sendPrivateChat } from '@/api/chat'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()

const userStore = useUserStore()

const isYourFriend = ref(false)
async function checkIsFriend(id: number) {
  const friendshipRes = await getFriendshipList()
  return friendshipRes.data.some((friendship) => friendship.id === id)
}

const businessCardInfo = ref<API.BusinessCardInfo | null>(null)
async function getBusinessCardInfo() {
  const businessCardRes = await checkBusinessCardById({ id: route.query.id as string })
  businessCardInfo.value = businessCardRes.data
  const isFriend = checkIsFriend(businessCardRes.data.id)
  if (isFriend) {
    isYourFriend.value = true
  }
}
getBusinessCardInfo()

const buttonText = computed(() => (isYourFriend.value ? '发消息' : '添加到通讯录'))

function backToLastPage() {
  history.back()
}

function onClickRight() {
  console.log('clicked')
}

async function handleByIsFriend() {
  if (isYourFriend.value) {
    const { data } = await getOneToOneChatHistory({ friendId: businessCardInfo.value.id })
    let queryId
    // 查看是否有私聊记录，有则跳转页面，没有则创建私聊，得到聊天室id后，跳转页面
    if (data.chatroomId) {
      // 跳转页面
      queryId = data.chatroomId
    } else {
      const privateChatRes = await sendPrivateChat({ friendId: businessCardInfo.value.id })
      queryId = privateChatRes.data.chatroomId
    }
    router.push({
      path: '/chatroom',
      query: {
        id: queryId
      }
    })
  } else {
    // 发送添加好友请求
    sendFriendshipRequest({
      friendId: businessCardInfo.value.id,
      reason: `我是${userStore.userInfo.username}`
    })
  }
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
      <!-- 判断当前的用户是否是自己的好友，如果是则显示发消息，如果不是，显示添加好友 -->
      <!-- 如果已是好友的情况下，点击发消息，如果双方同处于私聊中，则跳转页面，查询聊天记录并显示；如果不存在，则创建一个私聊，得到聊天室id后，跳转页面 -->
      <VanButton size="large" type="primary" @click="handleByIsFriend">{{ buttonText }}</VanButton>
    </div>
  </div>
</template>

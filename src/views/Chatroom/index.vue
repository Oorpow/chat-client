<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { io, Socket } from 'socket.io-client'
import { useUserStore } from '@/stores/user'
import { getChatHistoryByChatroomId } from '@/api/chat-history'
import { SocketEventName } from '@/constants/event-name'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const route = useRoute()
const chatroomId = ref<number>(Number(route.query.id))
const friendName = ref<string>(route.query.friend as string)

function backToLastPage() {
  history.back()
}

function onClickRight() {
  console.log('clicked')
}

const chatHistory = ref<API.GetChatHistoryRes[]>([
  {
    id: 1,
    content: 'hello',
    type: 0,
    chatroomId: 1,
    fromUserId: 1,
    user: { id: 1, username: 'oorpow' }
  },
  {
    id: 2,
    content: '你好',
    type: 0,
    chatroomId: 1,
    fromUserId: 2,
    user: { id: 2, username: '邵娟' }
  },
  {
    id: 3,
    content: `heiheihei`,
    type: 0,
    chatroomId: 1,
    fromUserId: 1,
    user: { id: 1, username: 'oorpow' }
  },
  {
    id: 4,
    content: 'gogogo shaojuan',
    type: 0,
    chatroomId: 1,
    fromUserId: 2,
    user: { id: 2, username: '邵娟' }
  }
])
/**
 * 获取聊天记录
 */
async function getChatHistory() {
  const { data } = await getChatHistoryByChatroomId({ chatroomId: chatroomId.value })
  chatHistory.value.length = 0
  chatHistory.value.push(...data)
}
getChatHistory()

const socketInstance = ref<Socket>()
const message = ref('')
/**
 * 发送消息
 */
function handleSendMessage() {
  const payload: API.ChatMessagePayload = {
    fromUserId: userInfo.value.id,
    chatroomId: chatroomId.value,
    message: {
      type: 'text',
      content: message.value
    }
  }
  socketInstance.value?.emit(SocketEventName.SendMessage, payload)
  message.value = ''
}

const chatWrapperRef = ref<HTMLDivElement | null>(null)

// 初始化socket连接和事件监听
onMounted(() => {
  socketInstance.value = io(import.meta.env.VITE_SOCKET_URL)
  socketInstance.value.emit(SocketEventName.JoinChat, {
    chatroomId: chatroomId.value,
    fromUserId: userInfo.value.id
  })
  socketInstance.value.on('message', (reply: API.ChatMessageReply) => {
    const { id, message, userId, chatroomId, type } = reply
    if (type === SocketEventName.JoinChat) {
      console.log('someone join chat')
    } else if (type === SocketEventName.SendMessage) {
      console.log(`reply`, reply)
      // 将信息追加到聊天记录中显示
      chatHistory.value = [
        ...chatHistory.value,
        {
          id,
          content: message.content,
          type: message.type,
          fromUserId: userId,
          chatroomId
        }
      ]
      chatWrapperRef.value.scrollIntoView({ block: 'end', behavior: 'smooth' })
    }
  })
})
</script>

<template>
  <van-nav-bar :title="friendName" left-arrow @click-left="backToLastPage">
    <template #right>
      <van-icon name="ellipsis" @click="onClickRight" />
    </template>
  </van-nav-bar>
  <div>
    <!-- TODO 这里的高度后续需要修改 -->
    <div
      class="p-4 overflow-y-auto bg-blue-100"
      style="height: calc(100vh - 125px)"
      ref="chatWrapperRef"
    >
      <div class="flex flex-col gap-2">
        <template v-for="msgItem in chatHistory" :key="msgItem.id">
          <!-- 对方用户发的消息 -->
          <div class="flex gap-2" v-if="msgItem.fromUserId !== userInfo.id">
            <Avatar :width="50" />
            <div>
              <span>{{ friendName }}</span>
              <div class="p-2 bg-white rounded">
                <p>{{ msgItem.content }}</p>
              </div>
            </div>
          </div>
          <!-- 右侧，我自己发出去的消息 -->
          <div class="flex items-center justify-end gap-2" v-else>
            <div class="p-2 bg-white rounded">
              <p>{{ msgItem.content }}</p>
            </div>
            <Avatar :width="50" />
          </div>
        </template>
      </div>
    </div>
    <!-- 底部输入框 -->
    <div class="fixed bottom-0 left-0 right-0 flex items-center py-4 bg-gray-100">
      <van-cell-group inset class="flex-1">
        <van-field v-model="message" type="textarea" autosize rows="1" />
      </van-cell-group>
      <div class="flex items-center gap-2 mr-2">
        <van-button type="primary" @click="handleSendMessage">发送</van-button>
        <van-icon name="smile-o" :size="30" />
        <van-icon name="add-o" :size="30" />
      </div>
    </div>
  </div>
</template>

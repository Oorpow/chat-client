<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getChatroomInfoById } from '@/api/chat'

const route = useRoute()

function backToLastPage() {
  history.back()
}

function onClickRight() {
  console.log('clicked')
}

const chatroomInfo = ref<API.GetChatroomInfoRes | null>(null)

/**
 * 根据id查询聊天室信息
 */
async function initChatroomInfo() {
  const { data } = await getChatroomInfoById({ chatroomId: Number(route.query.id) })
  chatroomInfo.value = data
}
initChatroomInfo()

const message = ref('')
</script>

<template>
  <van-nav-bar :title="chatroomInfo?.name" left-arrow @click-left="backToLastPage">
    <template #right>
      <van-icon name="ellipsis" @click="onClickRight" />
    </template>
  </van-nav-bar>
  <div>
    <!-- 这里的高度后续需要修改 -->
    <div class="p-4 overflow-y-auto bg-blue-100" style="height: calc(100vh - 125px)">
      <div class="flex flex-col gap-2">
        <!-- 对方用户消息item -->
        <div class="flex gap-2">
          <Avatar :width="50" />
          <div>
            <span>Oorpow</span>
            <!-- message box -->
            <div class="p-2 bg-white rounded">
              <p>测试文本</p>
            </div>
          </div>
        </div>
        <!-- 右侧，我自己发出去的消息 -->
        <div class="flex items-center justify-end gap-2">
          <div class="p-2 bg-white rounded">
            <p>测试文本</p>
          </div>
          <Avatar :width="50" />
        </div>
      </div>
    </div>
    <!-- 底部输入框 -->
    <div class="fixed bottom-0 left-0 right-0 flex items-center py-4 bg-gray-100">
      <!-- 是否需要更改类型为textarea -->
      <van-cell-group inset class="flex-1">
        <van-field v-model="message" type="textarea" autosize rows="1" />
      </van-cell-group>
      <div class="flex gap-2 mr-2">
        <van-icon name="smile-o" :size="30" />
        <van-icon name="add-o" :size="30" />
      </div>
    </div>
  </div>
</template>

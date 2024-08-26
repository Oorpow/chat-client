<script setup lang="ts">
import { showFailToast, showLoadingToast } from 'vant'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

const form = ref<API.UserLoginForm>({
  username: '',
  password: ''
})

const onSubmit = async (values: API.UserLoginForm) => {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true
  })
  const err = await userStore.login(values)
  if (!err) {
    // 保存token，跳转至首页
    setTimeout(() => {
      router.push('/chat')
    }, 1000)
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="form.username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="form.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 登录 </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped></style>

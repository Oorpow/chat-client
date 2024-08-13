<script setup>
import { ref } from 'vue'

const form = ref(null)

const formData = ref({
  username: '',
  password: ''
})

function handleRegister() {
  // 校验表单
  form.value.validate()
  console.log('注册')
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <var-form ref="form" scroll-to-error="start" class="w-[90%]">
      <var-space direction="column" :size="[15, 0]">
        <var-input
          placeholder="请输入用户名"
          :rules="[(v) => !!v || '用户名不能为空']"
          v-model="formData.username"
        />
        <var-input
          type="password"
          placeholder="请输入密码"
          :rules="[(v) => !!v || '密码不能为空', (v) => v.length >= 6 || '密码长度不能低于6位']"
          v-model="formData.password"
        />
        <var-button type="primary" class="w-full" @click="handleRegister"> 注册 </var-button>
        <var-button type="primary" class="w-full" @click="$router.push('/login')">
          已有账户,去登录
        </var-button>
      </var-space>
    </var-form>
  </div>
</template>

<style scoped></style>

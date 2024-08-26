<template>
  <div>chat</div>
</template>

<script setup>
import { userAuthInfo } from '@/api/user'

userAuthInfo().then((res) => {
  console.log(`res`, res)
})
</script>

<style lang="scss" scoped></style>

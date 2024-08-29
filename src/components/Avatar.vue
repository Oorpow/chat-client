<script setup lang="ts">
type Props = {
  src: string
}

const props = defineProps<Props>()
</script>

<template>
  <div>
    <van-image
      width="100px"
      height="100px"
      fit="cover"
      :src="props.src || '/avatar_github.jpeg'"
      :radius="5"
    />
  </div>
</template>

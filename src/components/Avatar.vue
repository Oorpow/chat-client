<script setup lang="ts">
type Props = {
  width?: number
  radius?: number
  src?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: 100,
  src: '/avatar_github.jpeg',
  radius: 5
})
</script>

<template>
  <div>
    <van-image :width="width" fit="cover" :src="props.src" :radius="radius" />
  </div>
</template>

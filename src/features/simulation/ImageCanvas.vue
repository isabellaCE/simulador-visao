<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  image: ImageData
  label: string
}>()

const canvas = ref<HTMLCanvasElement | null>(null)

function draw() {
  const el = canvas.value
  if (!el) return
  el.width = props.image.width
  el.height = props.image.height
  el.getContext('2d')?.putImageData(props.image, 0, 0)
}

onMounted(draw)
watch(() => props.image, draw)
</script>

<template>
  <figure class="image-canvas">
    <figcaption>{{ label }}</figcaption>
    <canvas ref="canvas" role="img" :aria-label="label" />
  </figure>
</template>

<style scoped>
.image-canvas {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  min-width: 0;
}

figcaption {
  color: var(--text-h);
  font-weight: 500;
}

canvas {
  width: 100%;
  height: auto;
  border: 1px solid var(--border);
  border-radius: 8px;
}
</style>

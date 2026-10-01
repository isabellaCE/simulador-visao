<script setup lang="ts">
import { computed } from 'vue'
import ImageCanvas from './ImageCanvas.vue'
import { cloneImageData } from './loadImageData'

const props = defineProps<{
  image: ImageData
}>()

// Por enquanto a simulada é uma cópia; os filtros entram na Etapa 2.
const simulated = computed(() => cloneImageData(props.image))
</script>

<template>
  <section class="simulation-view" aria-label="Comparação entre a imagem original e a simulada">
    <ImageCanvas :image="image" label="Original" />
    <ImageCanvas :image="simulated" label="Simulada" />
  </section>
</template>

<style scoped>
.simulation-view {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

@media (max-width: 640px) {
  .simulation-view {
    grid-template-columns: 1fr;
  }
}
</style>

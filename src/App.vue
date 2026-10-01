<script setup lang="ts">
import { shallowRef, ref } from 'vue'
import { loadImageData, SimulationView } from './features/simulation'
import { ImageUpload } from './features/upload'

const image = shallowRef<ImageData | null>(null)
const loadError = ref<string | null>(null)
let latestLoad = 0

async function handleImageSelect(file: File) {
  const load = ++latestLoad
  try {
    const data = await loadImageData(file)
    if (load !== latestLoad) return
    image.value = data
    loadError.value = null
  } catch {
    if (load !== latestLoad) return
    loadError.value = 'Não foi possível ler essa imagem. O arquivo pode estar corrompido.'
  }
}
</script>

<template>
  <main>
    <h1>Simulador de Visão</h1>
    <ImageUpload @select="handleImageSelect" />
    <p v-if="loadError" class="load-error" role="alert">{{ loadError }}</p>
    <SimulationView v-if="image" :image="image" />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 16px;
}

.load-error {
  margin: 0;
  color: #d93025;
}
</style>

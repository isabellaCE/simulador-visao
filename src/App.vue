<script setup lang="ts">
import { ImageUpload } from './features/upload'

function handleImageSelect(file: File) {
  console.log('Imagem selecionada:', file.name, file.type, file.size)
}
</script>

<template>
  <main>
    <h1>Simulador de Visão</h1>
    <ImageUpload @select="handleImageSelect" />
  </main>
</template>

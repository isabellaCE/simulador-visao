<script setup lang="ts">
import { ref } from 'vue'
import { useImageUpload } from './useImageUpload'
import { ACCEPTED_TYPES } from './validateImage'

const emit = defineEmits<{
  select: [file: File]
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const { previewUrl, fileName, error, isDragging, onInputChange, onDragOver, onDragLeave, onDrop } =
  useImageUpload((file) => emit('select', file))

function openPicker() {
  fileInput.value?.click()
}
</script>

<template>
  <div class="image-upload">
    <div
      class="dropzone"
      :class="{ dragging: isDragging }"
      role="button"
      tabindex="0"
      aria-label="Enviar imagem: arraste, escolha um arquivo PNG ou JPG, ou cole com Ctrl+V"
      @click="openPicker"
      @keydown.enter.prevent="openPicker"
      @keydown.space.prevent="openPicker"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <img v-if="previewUrl" :src="previewUrl" :alt="fileName ?? ''" class="preview" />
      <div class="instructions">
        <strong>{{ previewUrl ? 'Trocar imagem' : 'Enviar imagem' }}</strong>
        <span>Arraste aqui, clique para escolher um PNG/JPG ou cole com <kbd>Ctrl</kbd>+<kbd>V</kbd></span>
        <span v-if="fileName" class="file-name">{{ fileName }}</span>
      </div>
    </div>

    <p v-if="error" class="error" role="alert">{{ error }}</p>

    <input
      ref="fileInput"
      type="file"
      :accept="ACCEPTED_TYPES.join(',')"
      hidden
      @change="onInputChange"
    />
  </div>
</template>

<style scoped>
.image-upload {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 200px;
  padding: 24px;
  border: 2px dashed var(--border);
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition:
    border-color 0.15s,
    background-color 0.15s;
}

.dropzone:hover,
.dropzone:focus-visible,
.dropzone.dragging {
  border-color: var(--accent-border);
  background: var(--accent-bg);
  outline: none;
}

.instructions {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.instructions strong {
  color: var(--text-h);
}

.preview {
  max-width: 100%;
  max-height: 320px;
  border-radius: 8px;
  object-fit: contain;
}

.file-name {
  font-family: var(--mono);
  font-size: 0.85em;
}

kbd {
  font-family: var(--mono);
  font-size: 0.85em;
  padding: 1px 5px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--code-bg);
}

.error {
  margin: 0;
  color: #d93025;
}
</style>

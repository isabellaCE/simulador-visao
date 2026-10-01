import { onBeforeUnmount, onMounted, ref } from 'vue'
import { validateImage } from './validateImage'

export function useImageUpload(onSelect: (file: File) => void) {
  const previewUrl = ref<string | null>(null)
  const fileName = ref<string | null>(null)
  const error = ref<string | null>(null)
  const isDragging = ref(false)

  function acceptFile(file: File | null | undefined) {
    if (!file) return

    const result = validateImage(file)
    if (!result.ok) {
      error.value = result.error
      return
    }

    error.value = null
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = URL.createObjectURL(file)
    fileName.value = file.name || 'imagem colada'
    onSelect(file)
  }

  function onInputChange(event: Event) {
    const input = event.target as HTMLInputElement
    acceptFile(input.files?.[0])
    input.value = ''
  }

  function onDragOver(event: DragEvent) {
    event.preventDefault()
    isDragging.value = true
  }

  function onDragLeave(event: DragEvent) {
    if (!(event.currentTarget as Node).contains(event.relatedTarget as Node | null)) {
      isDragging.value = false
    }
  }

  function onDrop(event: DragEvent) {
    event.preventDefault()
    isDragging.value = false
    acceptFile(event.dataTransfer?.files[0])
  }

  function onPaste(event: ClipboardEvent) {
    const item = Array.from(event.clipboardData?.items ?? []).find(
      (i) => i.kind === 'file' && i.type.startsWith('image/'),
    )
    if (!item) return
    event.preventDefault()
    acceptFile(item.getAsFile())
  }

  onMounted(() => window.addEventListener('paste', onPaste))
  onBeforeUnmount(() => {
    window.removeEventListener('paste', onPaste)
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
  })

  return { previewUrl, fileName, error, isDragging, onInputChange, onDragOver, onDragLeave, onDrop }
}

// Decodifica a imagem enviada e devolve os bytes RGBA dela.
export async function loadImageData(file: Blob): Promise<ImageData> {
  const bitmap = await createImageBitmap(file)
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    bitmap.close()
    throw new Error('Não foi possível criar o contexto 2D do canvas.')
  }

  ctx.drawImage(bitmap, 0, 0)
  bitmap.close()
  return ctx.getImageData(0, 0, canvas.width, canvas.height)
}

export function cloneImageData(image: ImageData): ImageData {
  return new ImageData(new Uint8ClampedArray(image.data), image.width, image.height)
}

export const ACCEPTED_TYPES = ['image/png', 'image/jpeg']
export const MAX_SIZE_BYTES = 10 * 1024 * 1024

export type ValidationResult = { ok: true } | { ok: false; error: string }

export function validateImage(
  file: Pick<File, 'type' | 'size'>,
  maxSize = MAX_SIZE_BYTES,
): ValidationResult {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return { ok: false, error: 'Formato não suportado. Envie uma imagem PNG ou JPG.' }
  }
  if (file.size > maxSize) {
    const limitMb = Math.round(maxSize / (1024 * 1024))
    return { ok: false, error: `Imagem muito grande. O limite é ${limitMb} MB.` }
  }
  return { ok: true }
}

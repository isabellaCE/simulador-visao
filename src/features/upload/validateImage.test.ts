import { describe, expect, it } from 'vitest'
import { MAX_SIZE_BYTES, validateImage } from './validateImage'

describe('validateImage', () => {
  it('aceita PNG', () => {
    expect(validateImage({ type: 'image/png', size: 1024 })).toEqual({ ok: true })
  })

  it('aceita JPG', () => {
    expect(validateImage({ type: 'image/jpeg', size: 1024 })).toEqual({ ok: true })
  })

  it.each(['image/gif', 'image/webp', 'image/svg+xml', 'application/pdf', ''])(
    'rejeita o tipo "%s"',
    (type) => {
      const result = validateImage({ type, size: 1024 })
      expect(result.ok).toBe(false)
    },
  )

  it('aceita imagem exatamente no limite de tamanho', () => {
    expect(validateImage({ type: 'image/png', size: MAX_SIZE_BYTES })).toEqual({ ok: true })
  })

  it('rejeita imagem acima do limite de tamanho', () => {
    const result = validateImage({ type: 'image/png', size: MAX_SIZE_BYTES + 1 })
    expect(result).toEqual({ ok: false, error: 'Imagem muito grande. O limite é 10 MB.' })
  })

  it('respeita um limite personalizado', () => {
    const twoMb = 2 * 1024 * 1024
    expect(validateImage({ type: 'image/jpeg', size: twoMb + 1 }, twoMb).ok).toBe(false)
    expect(validateImage({ type: 'image/jpeg', size: twoMb }, twoMb).ok).toBe(true)
  })
})

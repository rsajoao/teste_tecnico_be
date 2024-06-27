import vine from '@vinejs/vine'

export const novoUsuarioValidador = vine.compile(
  vine.object({
    email: vine.string().email().trim(),
    username: vine.string().minLength(3).maxLength(16),
    senha: vine.string().minLength(6),
    enderecoId: vine.string().alphaNumeric(),
    ddd: vine.string().regex(/^\(\d{2}\)$/),
    telefone: vine.string().regex(/^\d{4,5}-\d{4}$/),
  })
)

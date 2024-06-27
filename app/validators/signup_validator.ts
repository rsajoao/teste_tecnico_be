import vine from '@vinejs/vine'

export const novoUsuarioValidador = vine.compile(
  vine.object({
    email: vine.string().email(),
    username: vine.string().minLength(3).maxLength(16),
    senha: vine.string().minLength(8).alphaNumeric(),
  })
)

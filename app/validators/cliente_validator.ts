import vine from '@vinejs/vine'

export const novoClienteValidador = vine.compile(
  vine.object({
    nome: vine.string().minLength(2).maxLength(128),
    sobrenome: vine.string().minLength(2).maxLength(128),
    cpf: vine.string().fixedLength(11),
    ddd: vine.string().fixedLength(2),
    telefone: vine.string().minLength(8).maxLength(9),
  })
)

export const atualizarClienteValidador = vine.compile(
  vine.object({
    nome: vine.string().minLength(2).maxLength(128).optional(),
    sobrenome: vine.string().minLength(2).maxLength(128).optional(),
    cpf: vine.string().fixedLength(11).optional(),
    ddd: vine.string().fixedLength(2).optional(),
    telefone: vine.string().minLength(8).maxLength(9).optional(),
  })
)

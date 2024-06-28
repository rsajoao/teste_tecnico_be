import vine from '@vinejs/vine'

export const novoClienteValidador = vine.compile(
  vine.object({
    nome: vine.string().minLength(2).maxLength(128).toUpperCase(),
    sobrenome: vine.string().minLength(2).maxLength(128).toUpperCase(),
    cpf: vine
      .string()
      .fixedLength(11)
      .transform(
        (cpf) => `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`
      ),
    ddd: vine.string().fixedLength(2),
    telefone: vine.string().minLength(8).maxLength(9),
  })
)

export const atualizarClienteValidador = vine.compile(
  vine.object({
    nome: vine.string().minLength(2).maxLength(128).toUpperCase().optional(),
    sobrenome: vine.string().minLength(2).maxLength(128).toUpperCase().optional(),
    cpf: vine
      .string()
      .fixedLength(11)
      .transform(
        (cpf) => `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`
      )
      .optional(),
    ddd: vine.string().fixedLength(2).optional(),
    telefone: vine.string().minLength(8).maxLength(9).optional(),
  })
)

import vine from '@vinejs/vine'

export const novoEnderecoValidador = vine.compile(
  vine.object({
    logradouro: vine.string().minLength(3).maxLength(255).toUpperCase(),
    numero: vine.string().maxLength(10),
    complemento: vine.string().toUpperCase().optional(),
    bairro: vine.string().maxLength(255).toUpperCase(),
    cidade: vine.string().minLength(2).maxLength(255).toUpperCase(),
    uf: vine.string().fixedLength(2).toUpperCase(),
    cep: vine
      .string()
      .fixedLength(8)
      .transform((cep) => {
        if (cep) return `${cep.slice(0, 5)}-${cep.slice(5)}`
        return cep
      }),
  })
)

export const atualizarEnderecoValidador = vine.compile(
  vine.object({
    logradouro: vine.string().minLength(3).maxLength(255).toUpperCase().optional(),
    numero: vine.string().maxLength(10).optional(),
    complemento: vine.string().toUpperCase().optional(),
    bairro: vine.string().maxLength(255).toUpperCase().optional(),
    cidade: vine.string().minLength(2).maxLength(255).toUpperCase().optional(),
    uf: vine.string().fixedLength(2).toUpperCase().optional(),
    cep: vine
      .string()
      .fixedLength(8)
      .optional()
      .transform((cep) => {
        if (cep) return `${cep.slice(0, 5)}-${cep.slice(5)}`
        return cep
      }),
  })
)

import vine from '@vinejs/vine'

export const novoProdutoValidador = vine.compile(
  vine.object({
    nome: vine.string().minLength(6).maxLength(255).toUpperCase(),
    qtdEstoque: vine.number().min(0),
    valorUnitario: vine.number().decimal([0, 2]),
  })
  // vine.object({
  //   logradouro: vine.string().minLength(3).maxLength(255).toUpperCase(),
  //   numero: vine.string().maxLength(10),
  //   complemento: vine.string().toUpperCase().optional(),
  //   bairro: vine.string().maxLength(255).toUpperCase(),
  //   cidade: vine.string().minLength(2).maxLength(255).toUpperCase(),
  //   uf: vine.string().fixedLength(2).toUpperCase(),
  //   cep: vine
  //     .string()
  //     .fixedLength(8)
  //     .transform((cep) => {
  //       if (cep) return `${cep.slice(0, 5)}-${cep.slice(5)}`
  //       return cep
  //     }),
  // })
)

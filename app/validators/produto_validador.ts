import vine from '@vinejs/vine'

export const novoProdutoValidador = vine.compile(
  vine.object({
    nome: vine.string().minLength(6).maxLength(255).toUpperCase(),
    qtdEstoque: vine.number().min(0),
    valorUnitario: vine.number().decimal([0, 2]),
  })
)

export const atualizarProdutoValidador = vine.compile(
  vine.object({
    nome: vine
      .string()
      .minLength(6)
      .maxLength(255)
      .toUpperCase()
      .optional(),
    qtdEstoque: vine.number().optional(),
    valorUnitario: vine.number().decimal([0, 2]).optional(),
  })
)

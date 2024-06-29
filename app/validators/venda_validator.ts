import vine from '@vinejs/vine'

export const novaVendaValidador = vine.compile(
  vine.object({
    clienteId: vine.number(),
    produtos: vine.array(
      vine.object({
        produtoId: vine.number(),
        quantidade: vine.number(),
      })
    ),
  })
)

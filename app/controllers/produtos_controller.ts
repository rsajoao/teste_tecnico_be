import Produto from '#models/Produto'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProdutosController {
  public async list({ response }: HttpContext) {
    try {
      const produtos = await Produto.query()
        .select('id', 'nome', 'valorUnitario', 'qtdEstoque')
        .orderBy('nome', 'asc')
      return response.ok(produtos)
    } catch (error) {
      return response.internalServerError({
        erro: 'erro ao listar produtos',
      })
    }
  }
}

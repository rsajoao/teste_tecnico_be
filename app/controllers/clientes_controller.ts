import Cliente from '#models/Cliente'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClientesController {
  public async listar({ response }: HttpContext) {
    try {
      const clientes = await Cliente.query()
        .select('id', 'nome', 'sobrenome', 'DDD', 'telefone')
        .orderBy('id', 'asc')
      return response.ok(clientes)
    } catch (error) {
      return response.internalServerError({
        erro: 'erro ao listar clientes',
      })
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const clienteId = params.id
      const data = await Cliente.query()
        .where('id', clienteId)
        .preload('vendas', (queryVenda) => {
          queryVenda
            .orderBy('createdAt', 'desc')
            .preload('produtosComprados', (queryVendaProduto) => {
              queryVendaProduto.preload('produto')
            })
        })
        .firstOrFail()

      const cliente = {
        id: data.id,
        nome: data.nome,
        sobrenome: data.sobrenome,
        contato: `(${data.ddd})${data.telefone}`,
        compras: data.vendas.map((venda) => ({
          id: venda.id,
          data: venda.createdAt,
          valorCompra: venda.produtosComprados.reduce((a, b) => a + b.valor, 0),
          produtosComprados: venda.produtosComprados.map((produto) => ({
            id: produto.produto.id,
            nome: produto.produto.nome,
            valorUnitario: produto.produto.valorUnitario,
            quantidade: produto.quantidade,
            valorProdutos: produto.valor,
          })),
        })),
      }

      return response.ok(cliente)
    } catch (error) {
      console.log('eu estou me sentindo uma batata')
      return response.internalServerError({
        erro: 'erro ao buscar cliente',
        message: error.message,
      })
    }
  }
}

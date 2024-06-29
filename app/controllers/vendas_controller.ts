import Produto from '#models/Produto'
import Venda from '#models/Venda'
import VendaProduto from '#models/Venda_Produto'
import { novaVendaValidador } from '#validators/venda_validator'
import { HttpContext } from '@adonisjs/core/http'

interface ProdutoVendido {
  produtoId: number
  quantidade: number
}

export default class VendasController {
  public async register({ request, response }: HttpContext) {
    try {
      const venda = request.only(['clienteId', 'produtos'])

      const payload = await novaVendaValidador.validate(venda)

      const produtosIds = payload.produtos.map((p: ProdutoVendido) => p.produtoId)
      const produtosDb = await Produto.query().whereIn('id', produtosIds).whereNotNull('deletedAt')

      const vendaProdutos = []

      let valorTotal = 0

      for (const produto of payload.produtos) {
        const produtoDb = produtosDb.find((p) => p.id === produto.produtoId)

        if (!produtoDb || produtoDb.qtdEstoque < produto.quantidade) {
          return response.badRequest({
            erro: `Produto [${produtoDb ? produtoDb.nome : produto.produtoId}] não encontrado ou estoque insuficiente`,
          })
        }
        const valorProdutoTotal = produtoDb.valorUnitario * produto.quantidade
        valorTotal += valorProdutoTotal

        vendaProdutos.push({
          produtoId: produto.produtoId,
          quantidade: produto.quantidade,
          valor: valorProdutoTotal,
        })

        produtoDb.qtdEstoque -= produto.quantidade
      }

      const novaVenda = await Venda.create({ clienteId: payload.clienteId, valorTotal })
      await Promise.all([
        ...produtosDb.map((p) => p.save()),
        VendaProduto.createMany(
          vendaProdutos.map((vendaProduto) => ({ ...vendaProduto, vendaId: novaVenda.id }))
        ),
      ])

      return response.ok({ id: novaVenda.id })
    } catch (error) {
      return response.internalServerError({ erro: 'erro ao cadastrar venda' })
    }
  }
}

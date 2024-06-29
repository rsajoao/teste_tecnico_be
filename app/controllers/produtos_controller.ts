import Produto from '#models/Produto'
import { novoProdutoValidador, atualizarProdutoValidador } from '#validators/produto_validador'
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

  public async show({ params, response }: HttpContext) {
    try {
      const produtoId = params.id
      const produto = await Produto.query()
        .where('id', produtoId)
        .select('nome', 'qtdEstoque', 'valorUnitario')
        .firstOrFail()
      return response.ok(produto)
    } catch (error) {
      return response.internalServerError({ erro: 'erro ao buscar produto' })
    }
  }

  public async store({ request, response }: HttpContext) {
    try {
      const produto = request.all()
      const payloadProduto = await novoProdutoValidador.validate(produto)

      const novoProduto = await Produto.create(payloadProduto)

      return response.created(novoProduto)
    } catch (error) {
      return response.internalServerError({
        erro: 'erro ao adicionar produto',
        message: error.message,
      })
    }
  }

  public async update({ params, request, response }: HttpContext) {
    try {
      const produtoId = params.id
      const produtoAtualizado = request.only(['nome', 'qtdEstoque', 'valorUnitario'])
      console.log(produtoAtualizado)

      const payloadProduto = await atualizarProdutoValidador.validate(produtoAtualizado)

      const produto = await Produto.findOrFail(produtoId)
      produto.merge(payloadProduto)
      await produto.save()

      return response.ok(produto)
    } catch (error) {
      return response.internalServerError({ erro: 'erro ao atualizar produto' })
    }
  }
}

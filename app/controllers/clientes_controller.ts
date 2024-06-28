import Cliente from '#models/Cliente'
import { atualizarClienteValidador, novoClienteValidador } from '#validators/cliente_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClientesController {
  public async list({ response }: HttpContext) {
    try {
      const clientes = await Cliente.query()
        .select('id', 'nome', 'sobrenome', 'ddd', 'telefone')
        .orderBy('id', 'asc')
      return response.ok(clientes)
    } catch (error) {
      return response.internalServerError({
        erro: 'erro ao listar clientes',
      })
    }
  }

  public async show({ params, request, response }: HttpContext) {
    try {
      const clienteId = params.id
      const mes = request.input('mes')
      const ano = request.input('ano')

      const data = await Cliente.query()
        .where('id', clienteId)
        .preload('vendas', (queryVenda) => {
          queryVenda.orderBy('createdAt', 'desc')
          if (mes && ano) {
            queryVenda.whereRaw('MONTH(created_at) = ? AND YEAR(created_at) = ?', [mes, ano])
          }
          queryVenda.preload('produtosComprados', (queryVendaProduto) => {
            queryVendaProduto.preload('produto')
          })
        })
        .firstOrFail()

      const cliente = {
        id: data.id,
        nome: data.nome,
        sobrenome: data.sobrenome,
        contato: `(${data.ddd})${data.telefone.slice(0, 5)}-${data.telefone.slice(5)}`,
        compras: data.vendas.map((venda) => ({
          id: venda.id,
          data: new Date(venda.createdAt.toString()).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }),
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
      return response.internalServerError({ erro: 'erro ao buscar cliente' })
    }
  }

  public async store({ request, response }: HttpContext) {
    try {
      const cliente = request.only(['nome', 'sobrenome', 'cpf', 'ddd', 'telefone'])
      const payload = await novoClienteValidador.validate(cliente)
      const novoCliente = await Cliente.create(payload)
      return response.created(novoCliente)
    } catch (error) {
      return response.internalServerError({ erro: 'erro ao criar cliente' })
    }
  }

  public async update({ params, request, response }: HttpContext) {
    try {
      const clienteId = params.id
      const dados = request.only(['nome', 'sobrenome', 'cpf', 'ddd', 'telefone'])
      const payload = await atualizarClienteValidador.validate(dados)

      const cliente = await Cliente.findOrFail(clienteId)
      cliente.merge(payload)
      await cliente.save()

      return response.ok(cliente)
    } catch (error) {
      return response.internalServerError({ erro: 'erro ao atualizar dados do cliente' })
    }
  }

  public async delete({ params, response }: HttpContext) {
    try {
      const clienteId = params.id
      const cliente = await Cliente.findOrFail(clienteId)

      await cliente.delete()

      return response.ok({ message: 'cliente removido do banco de dados' })
    } catch (error) {
      return response.internalServerError({ erro: 'erro ao remover cliente' })
    }
  }
}

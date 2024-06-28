import Cliente from '#models/Cliente'
import Endereco from '#models/Endereco'
import { atualizarClienteValidador, novoClienteValidador } from '#validators/cliente_validator'
import { atualizarEnderecoValidador, novoEnderecoValidador } from '#validators/endereco_validator'
import type { HttpContext, Request } from '@adonisjs/core/http'

export default class ClientesController {
  private static obterDadosClienteRequest(request: Request) {
    const cliente = request.only(['nome', 'sobrenome', 'cpf', 'ddd', 'telefone'])
    const endereco = request.only([
      'logradouro',
      'numero',
      'complemento',
      'bairro',
      'cidade',
      'uf',
      'cep',
    ])
    return { cliente, endereco }
  }

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
        .preload('endereco', (queryEndereco) => {
          queryEndereco.select(
            'logradouro',
            'numero',
            'complemento',
            'bairro',
            'cidade',
            'uf',
            'cep'
          )
        })
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
        endereco: data.endereco,
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
      const { cliente, endereco } = ClientesController.obterDadosClienteRequest(request)

      const payloadCliente = await novoClienteValidador.validate(cliente)
      const payloadEndereco = await novoEnderecoValidador.validate(endereco)

      const novoCliente = await Cliente.create(payloadCliente)
      await Endereco.create({
        clienteId: novoCliente.id,
        ...payloadEndereco,
      })

      return response.created(novoCliente)
    } catch (error) {
      return response.internalServerError({ erro: 'erro ao criar cliente', message: error.message })
    }
  }

  public async update({ params, request, response }: HttpContext) {
    try {
      const clienteId = params.id
      const { cliente, endereco } = ClientesController.obterDadosClienteRequest(request)

      const payloadCliente = await atualizarClienteValidador.validate(cliente)
      const payloadEndereco = await atualizarEnderecoValidador.validate(endereco)

      const clienteBancoDeDados = await Cliente.findOrFail(clienteId)
      clienteBancoDeDados.merge(payloadCliente)
      await clienteBancoDeDados.save()

      const enderecoBancoDeDados = await Endereco.query().where('cliente_id', clienteId).first()
      enderecoBancoDeDados!.merge(payloadEndereco)
      await enderecoBancoDeDados?.save()

      return response.ok(cliente)
    } catch (error) {
      return response.internalServerError({
        erro: 'erro ao atualizar dados do cliente',
        message: error.message,
      })
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

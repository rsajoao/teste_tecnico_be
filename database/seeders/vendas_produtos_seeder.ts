import Produto from '#models/Produto'
import VendaProduto from '#models/Venda_Produto'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const produto1 = await Produto.find(1)
    const produto2 = await Produto.find(2)
    const produto3 = await Produto.find(3)

    await VendaProduto.createMany([
      {
        vendaId: 1,
        produtoId: 2,
        quantidade: 4,
        valor: produto2!.valorUnitario * 4,
      },
      {
        vendaId: 1,
        produtoId: 1,
        quantidade: 2,
        valor: produto1!.valorUnitario * 2,
      },
      {
        vendaId: 1,
        produtoId: 3,
        quantidade: 1,
        valor: produto3!.valorUnitario,
      },
      {
        vendaId: 2,
        produtoId: 2,
        quantidade: 1,
        valor: produto2!.valorUnitario,
      },
      {
        vendaId: 2,
        produtoId: 3,
        quantidade: 7,
        valor: produto3!.valorUnitario * 7,
      },
      {
        vendaId: 3,
        produtoId: 1,
        quantidade: 1,
        valor: produto1!.valorUnitario,
      },
      {
        vendaId: 4,
        produtoId: 3,
        quantidade: 2,
        valor: produto3!.valorUnitario * 2,
      },
      {
        vendaId: 4,
        produtoId: 2,
        quantidade: 2,
        valor: produto2!.valorUnitario * 2,
      },
      {
        vendaId: 5,
        produtoId: 2,
        quantidade: 6,
        valor: produto2!.valorUnitario * 6,
      },
      {
        vendaId: 5,
        produtoId: 3,
        quantidade: 10,
        valor: produto3!.valorUnitario * 10,
      },
    ])
  }
}

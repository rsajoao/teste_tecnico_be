import Produto from '#models/Produto'
import VendaProduto from '#models/Venda_Produto'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const produto1 = await Produto.find(1)
    const produto2 = await Produto.find(2)
    const produto3 = await Produto.find(3)

    await VendaProduto.createMany([
      { vendaId: 1, produtoId: 1, quantidade: 1, valor: produto1!.valorUnitario * 1 },
      { vendaId: 1, produtoId: 2, quantidade: 2, valor: produto2!.valorUnitario * 2 },
      { vendaId: 1, produtoId: 3, quantidade: 3, valor: produto3!.valorUnitario * 3 },
      { vendaId: 2, produtoId: 1, quantidade: 4, valor: produto1!.valorUnitario * 4 },
      { vendaId: 2, produtoId: 2, quantidade: 5, valor: produto2!.valorUnitario * 5 },
      { vendaId: 2, produtoId: 3, quantidade: 6, valor: produto3!.valorUnitario * 6 },
      { vendaId: 3, produtoId: 1, quantidade: 7, valor: produto1!.valorUnitario * 7 },
      { vendaId: 3, produtoId: 3, quantidade: 8, valor: produto3!.valorUnitario * 8 },
      { vendaId: 4, produtoId: 1, quantidade: 9, valor: produto1!.valorUnitario * 9 },
      { vendaId: 4, produtoId: 2, quantidade: 10, valor: produto2!.valorUnitario * 10 },
      { vendaId: 4, produtoId: 3, quantidade: 11, valor: produto3!.valorUnitario * 11 },
      { vendaId: 5, produtoId: 1, quantidade: 12, valor: produto1!.valorUnitario * 12 },
      { vendaId: 5, produtoId: 2, quantidade: 13, valor: produto2!.valorUnitario * 13 },
      { vendaId: 5, produtoId: 3, quantidade: 14, valor: produto3!.valorUnitario * 14 },
      { vendaId: 6, produtoId: 2, quantidade: 15, valor: produto2!.valorUnitario * 15 },
      { vendaId: 6, produtoId: 3, quantidade: 16, valor: produto3!.valorUnitario * 16 },
      { vendaId: 7, produtoId: 3, quantidade: 17, valor: produto3!.valorUnitario * 17 },
      { vendaId: 7, produtoId: 1, quantidade: 18, valor: produto1!.valorUnitario * 18 },
    ])
  }
}

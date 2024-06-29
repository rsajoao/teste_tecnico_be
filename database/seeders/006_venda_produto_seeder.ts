import VendaProduto from '#models/Venda_Produto'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await VendaProduto.createMany([
      { vendaId: 1, produtoId: 1, quantidade: 9, valor: 4500.00  },
      { vendaId: 1, produtoId: 2, quantidade: 9, valor: 9000.00 },
      { vendaId: 1, produtoId: 3, quantidade: 8, valor: 799.92 },
      { vendaId: 1, produtoId: 4, quantidade: 7, valor: 318.50 },
      { vendaId: 1, produtoId: 5, quantidade: 6, valor: 4524.72 },
      { vendaId: 2, produtoId: 3, quantidade: 5, valor: 499.95 },
      { vendaId: 2, produtoId: 4, quantidade: 4, valor: 182.00 },
      { vendaId: 2, produtoId: 5, quantidade: 3, valor: 2262.36 },
      { vendaId: 3, produtoId: 2, quantidade: 2, valor: 2000.00 },
      { vendaId: 3, produtoId: 3, quantidade: 1, valor: 99.99 },
    ])
  }
}

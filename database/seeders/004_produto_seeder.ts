import Produto from '#models/Produto'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    const produtosData = []
    for (let i = 0; i < 30; i++) {
      const produto = {
        nome: faker.commerce.productName().toUpperCase(),
        qtdEstoque: faker.number.int({ min: 0, max: 100 }),
        valorUnitario: parseFloat(faker.commerce.price({ min: 10, max: 4500, dec: 2 })),
      }
      produtosData.push(produto)
    }
    await Produto.createMany(produtosData)
  }
}

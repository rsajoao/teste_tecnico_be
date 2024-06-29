import Produto from '#models/Produto'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    const produtosData = []
    for (let i = 0; i < 15; i++) {
      const produto = {
        nome: faker.commerce.productName().toUpperCase(),
        qtdEstoque: faker.number.int({ min: 0, max: 100 }),
        valorUnitario: parseFloat(faker.commerce.price({ min: 10, max: 4500, dec: 2 })),
      }
      produtosData.push(produto)
    }

    for (let i = 0; i < 10; i++) {
      const produtoDeletado = {
        nome: faker.commerce.productName().toUpperCase(),
        qtdEstoque: faker.number.int({ min: 0, max: 100 }),
        valorUnitario: parseFloat(faker.commerce.price({ min: 10, max: 4500, dec: 2 })),
        deletedAt: '2023-04-12 13:56:25',
      }
      produtosData.push(produtoDeletado)
    }
    await Produto.createMany([
      { nome: 'BICICLETA', qtdEstoque: 120, valorUnitario: 500.00 },
      { nome: 'SOFÁ', qtdEstoque: 4, valorUnitario: 1000.0 },
      { nome: 'DISCO NIRVANA', qtdEstoque: 27, valorUnitario: 99.99 },
      { nome: 'POSTER BOJACK HORSEMAN', qtdEstoque: 69, valorUnitario: 45.50 },
      { nome: 'ACTION FIGURE SATORU GOJO', qtdEstoque: 1, valorUnitario: 754.12 },
      ...produtosData,
    ])
  }
}

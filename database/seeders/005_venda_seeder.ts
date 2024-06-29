import Venda from '#models/Venda'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const vendas = [
      { clienteId: 1, valorTotal: 19143.14 },
      { clienteId: 1, valorTotal: 2944.31 },
      { clienteId: 2, valorTotal: 2099.99 }
    ]

    await Venda.createMany(vendas)
  }
}

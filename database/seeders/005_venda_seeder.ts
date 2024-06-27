import Venda from '#models/Venda'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const vendas = [
      { clienteId: 1 },
      { clienteId: 10 },
      { clienteId: 2 },
      { clienteId: 2 },
      { clienteId: 15 },
    ]

    await Venda.createMany(vendas)
  }
}

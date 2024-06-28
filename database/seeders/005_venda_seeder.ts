import Venda from '#models/Venda'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const vendas = [
      { clienteId: 1 },
      { clienteId: 1 },
      { clienteId: 1 },
      { clienteId: 2 },
      { clienteId: 2 },
      { clienteId: 3 },
      { clienteId: 4 },
    ]

    await Venda.createMany(vendas)
  }
}

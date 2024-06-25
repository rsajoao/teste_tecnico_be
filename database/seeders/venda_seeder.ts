import Venda from '#models/Venda'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const vendas = [
      { usuarioId: 1 },
      { usuarioId: 10 },
      { usuarioId: 2 },
      { usuarioId: 2 },
      { usuarioId: 15 },
    ]

    await Venda.createMany(vendas)
  }
}

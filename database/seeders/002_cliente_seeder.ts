import Cliente from '#models/Cliente'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    const clientes = []

    while (clientes.length < 50) {
      const cliente = {
        nome: faker.person.firstName(),
        sobrenome: faker.person.lastName(),
        CPF: Math.ceil(Math.random() * 99999999999)
          .toString()
          .padEnd(11, '0'),
        DDD: Math.ceil(Math.random() * 99)
          .toString()
          .padEnd(2, '0'),
        telefone:
          '9' +
          Math.ceil(Math.random() * 99999999)
            .toString()
            .padEnd(8, '3'),
      }
      clientes.push(cliente)
    }

    await Cliente.createMany(clientes)
  }
}

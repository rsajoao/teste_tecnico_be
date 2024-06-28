import Cliente from '#models/Cliente'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

function formatarCPF(cpf: string): string {
  return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`
}

export default class extends BaseSeeder {
  async run() {
    const clientes = []

    while (clientes.length < 50) {
      const cliente = {
        nome: faker.person.firstName().toUpperCase(),
        sobrenome: faker.person.lastName().toUpperCase(),
        cpf: formatarCPF(
          Math.ceil(Math.random() * 99999999999)
            .toString()
            .padEnd(11, '0')
        ),
        ddd: Math.ceil(Math.random() * 99)
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

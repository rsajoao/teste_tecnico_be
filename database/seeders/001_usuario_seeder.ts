import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Usuario from '#models/Usuario'
import { faker } from '@faker-js/faker'
import env from '#start/env'

export default class extends BaseSeeder {
  async run() {
    const emails = new Set<string>()
    const usernames = new Set<string>()

    while (emails.size < 19) {
      const email: string = faker.internet.email().toLowerCase()
      emails.add(email)
      usernames.add(email.split('@')[0])
    }

    const usuarios = [...emails].map((email, index) => ({
      email,
      senha: faker.internet.password(),
      username: [...usernames][index],
    }))

    const usuarioTeste = {
      email: 'usuarioteste@email.com',
      senha: env.get('USUARIO_TESTE_PASSWORD'),
      username: 'usuario',
    }

    await Usuario.createMany([usuarioTeste, ...usuarios])
  }
}

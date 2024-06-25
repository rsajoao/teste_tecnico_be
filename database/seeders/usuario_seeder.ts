import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Usuario from '#models/Usuario'
import { faker } from '@faker-js/faker'
import env from '#start/env'

export default class extends BaseSeeder {
  async run() {
    const uniqueEmails = new Set<string>()
    const uniqueUsernames = new Set<string>()

    while (uniqueEmails.size < 50) {
      const email: string = faker.internet.email().toLowerCase()
      uniqueEmails.add(email)
      uniqueUsernames.add(email.split('@')[0])
    }

    const usersData = [...uniqueEmails].map((email, index) => ({
      email,
      senha: faker.internet.password(),
      username: [...uniqueUsernames][index],
      enderecoId: index + 1,
    }))

    await Usuario.create({
      email: 'usuarioteste@email.com',
      senha: env.get('USUARIO_TESTE_PASSWORD'),
      username: 'usuario',
      enderecoId: 1,
    })
    await Usuario.createMany(usersData)
  }
}

import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Usuario from '#models/Usuario'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    const uniqueEmails = new Set<string>()
    const uniqueUsernames = new Set<string>()

    while (uniqueEmails.size < 50) {
      uniqueEmails.add(faker.internet.email())
    }
    while (uniqueUsernames.size < 50) {
      uniqueUsernames.add(faker.internet.userName())
    }

    const usersData = [...uniqueEmails].map((email, index) => ({
      email,
      senha: faker.internet.password(),
      username: [...uniqueUsernames][index],
    }))

    await Usuario.create({
      email: 'admin@admin.com',
      senha: 'ehehe123',
      username: 'admin',
    })
    await Usuario.createMany(usersData)
  }
}

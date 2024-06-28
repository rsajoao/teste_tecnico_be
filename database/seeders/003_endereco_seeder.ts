import Endereco from '#models/Endereco'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import {
  logradouro,
  regiaoAdministrativaDF,
  numero,
  complemento,
  CEP,
} from '../../helpers/enderecoSeeder.js'

export default class extends BaseSeeder {
  async run() {
    const enderecosData = []

    for (let i = 0; i < 50; i++) {
      const endereco = {
        logradouro: logradouro(),
        bairro: regiaoAdministrativaDF(),
        numero: numero(),
        complemento: complemento(),
        cidade: 'Brasília',
        uf: 'DF',
        cep: CEP(),
        clienteId: i + 1,
      }
      enderecosData.push(endereco)
    }

    await Endereco.createMany(enderecosData)
  }
}

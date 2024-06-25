import Endereco from '#models/Endereco'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    const enderecosData = []

    for (let i = 0; i < 51; i++) {
      const endereco = {
        logradouro:
          [
            'Rua ',
            'Avenida ',
            'Travessa ',
            'Beco ',
            'Boulevard ',
            'Conjunto ',
            'Quadra ',
            'Parque ',
            'Chácara ',
            'Vila ',
          ][Math.floor(Math.random() * 10)] +
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')[Math.floor(Math.random() * 36)],
        bairro: [
          'Brasília',
          'Gama',
          'Taguatinga',
          'Brazlândia',
          'Sobradinho',
          'Planaltina',
          'Paranoá',
          'Núcleo Bandeirante',
          'Ceilândia',
          'Guará',
          'Cruzeiro',
          'Samambaia',
          'Santa Maria',
          'São Sebastião',
          'Recanto das Emas',
          'Lago Sul',
          'Riacho Fundo',
          'Lago Norte',
          'Candangolândia',
          'Águas Claras',
          'Riacho Fundo II',
          'Sudoeste/Octogonal',
          'Varjão',
          'Park Way',
          'SCIA/Estrutural',
          'Sobradinho II',
          'Jardim Botânico',
          'Itapoã',
          'SIA',
          'Vicente Pires',
          'Fercal',
          'Sol Nascente/Pôr do Sol',
          'Arniqueira',
        ][Math.floor(Math.random() * 33)],
        numero: Math.ceil(Math.random() * 999)
          .toString()
          .padStart(3, '0'),
        complemento: ['Apartamento', 'Casa', 'Bloco', 'Lote', 'Quadra', 'Loja', null][
          Math.floor(Math.random() * 7)
        ],
        cidade: 'Brasília',
        uf: 'DF',
        cep:
          (Math.floor(Math.random() * 10000) + 70000).toString() +
          '-' +
          Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, '0'),
      }
      enderecosData.push(endereco)
    }

    await Endereco.createMany(enderecosData)
  }
}

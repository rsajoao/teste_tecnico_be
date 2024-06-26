import Usuario from '#models/Usuario'
import hash from '@adonisjs/core/services/hash'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  public async signup({ request, response }: HttpContext) {
    const novoUsuario = request.only([
      'email',
      'senha',
      'username',
      'ddd',
      'telefone',
      'enderecoId',
    ])

    const senhaCriptografada = await hash.make(novoUsuario.senha)

    try {
      await Usuario.create({ ...novoUsuario, senha: senhaCriptografada })
      return response.status(201).json({ message: 'usuário cadastrado com sucesso' })
    } catch (error) {
      return response.status(500).json({
        erro: 'o usuário não foi cadastrado',
        message: error.message
      })
    }
  }
}

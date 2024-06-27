import Usuario from '#models/Usuario'
import hash from '@adonisjs/core/services/hash'
import { HttpContext } from '@adonisjs/core/http'
import { novoUsuarioValidador } from '#validators/signup_validator'

export default class AuthController {
  public async signup({ request, response }: HttpContext) {
    const novoUsuario = request.all()
    const payload = await novoUsuarioValidador.validate(novoUsuario)

    const senhaCriptografada = await hash.make(payload.senha)

    try {
      await Usuario.create({
        ...payload,
        senha: senhaCriptografada,
      })
      return response.status(201).json({ message: 'usuário cadastrado com sucesso' })
    } catch (error) {
      return response.status(500).json({
        erro: 'o usuário não foi cadastrado',
      })
    }
  }
}

import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Endereco extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare logradouro: string

  @column()
  declare bairro: string

  @column()
  declare numero: string

  @column()
  declare complemento: string | null

  @column()
  declare cidade: string

  @column()
  declare uf: string

  @column()
  declare cep: string
}

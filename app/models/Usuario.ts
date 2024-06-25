import { DateTime } from 'luxon'
import { BaseModel, beforeSave, belongsTo, column } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'
import Endereco from './Endereco.js'
import * as relations from '@adonisjs/lucid/types/relations'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column()
  declare username: string

  @column({ serializeAs: null })
  declare senha: string

  @column()
  declare enderecoId: number | undefined

  @column()
  declare ddd: string
  
  @column()
  declare telefone: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Endereco, {
    foreignKey: 'enderecoId',
  })
  declare endereco: relations.BelongsTo<typeof Endereco>

  @beforeSave()
  public static async hashPassword(user: Usuario) {
    if (user.$dirty.senha) {
      user.senha = await hash.make(user.senha)
    }
  }
}

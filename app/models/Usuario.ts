import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare senha: string

  @column()
  declare username: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: Usuario) {
    if (user.$dirty.senha) {
      user.senha = await hash.make(user.senha)
    }
  }
}

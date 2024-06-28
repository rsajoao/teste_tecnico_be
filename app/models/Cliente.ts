import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Endereco from './Endereco.js'
import * as relations from '@adonisjs/lucid/types/relations'
import Venda from './Venda.js'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare sobrenome: string

  @column()
  declare cpf: string

  @column()
  declare ddd: string

  @column()
  declare telefone: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Endereco)
  declare endereco: relations.HasOne<typeof Endereco>

  @hasMany(() => Venda)
  declare vendas: relations.HasMany<typeof Venda>
}

import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import Venda from './Venda.js'
import Produto from './Produto.js'

export default class VendaProduto extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare vendaId: number

  @column()
  declare produtoId: number

  @column()
  declare quantidade: number

  @column()
  declare valor: number

  @belongsTo(() => Produto)
  declare produto: relations.BelongsTo<typeof Produto>

  @belongsTo(() => Venda)
  declare venda: relations.BelongsTo<typeof Venda>
}

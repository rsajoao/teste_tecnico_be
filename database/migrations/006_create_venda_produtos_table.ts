import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'venda_produtos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('venda_id').unsigned().references('vendas.id').onDelete('CASCADE').notNullable()
      table.integer('produto_id').unsigned().references('produtos.id').onDelete('CASCADE').notNullable()
      table.integer('quantidade').notNullable()
      table.float('valor', 10, 2).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

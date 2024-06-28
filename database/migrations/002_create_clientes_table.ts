import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clientes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome', 255).notNullable()
      table.string('sobrenome', 255).notNullable()
      table.string('cpf', 13).notNullable().unique().index()
      table.string('ddd', 2).notNullable()
      table.string('telefone', 9).notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now()).notNullable()
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now()).notNullable
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

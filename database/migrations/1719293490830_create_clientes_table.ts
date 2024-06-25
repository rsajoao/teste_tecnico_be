import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clientes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome', 255).notNullable()
      table.string('cpf', 11).notNullable().unique().index()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('email', 255).notNullable().unique().index()
      table.string('username', 127).notNullable().unique().index()
      table.string('senha', 255).notNullable()
      table.integer('endereco_id').unsigned().references('enderecos.id').onDelete('SET NULL')
      table.string('ddd', 4).notNullable
      table.string('telefone', 10).notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now()).notNullable()
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now()).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

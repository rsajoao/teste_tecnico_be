import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'enderecos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('logradouro', 255).notNullable()
      table.string('bairro', 255).notNullable()
      table.string('numero', 20).notNullable()
      table.string('complemento', 255)
      table.string('cidade', 255).notNullable().index()
      table.string('uf', 2).notNullable().index()
      table.string('cep', 9).notNullable().index()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tb_defesas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_defesa')
      table.string('nome_defesa', 50).notNullable()
      table.string('descricao_defesa', 1000)
      table.string('tipo_defesa', 50)
      table.string('peso_defesa', 50)
      table.integer('bonus_ca')
      table.string('penalidade_defesa', 500)
      table.integer('preco_defesa')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

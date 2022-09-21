import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tb_armas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_arma')
      table.string('nome_arma', 100).notNullable()
      table.string('descricao_arma', 1000)
      table.integer('municao_arma')
      table.string('habilidade_arma', 1000)
      table.integer('preco_arma')
      table.string('dano_arma', 50)
      table.string('critico_arma', 50)
      table.string('alcance_arma', 10)
      table.integer('peso_arma')
      table.string('tipo_ataque', 50)
      table.string('tipo_arma', 50)
      table.integer('qt_mao')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

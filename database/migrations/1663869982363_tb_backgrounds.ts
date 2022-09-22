import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tb_backgrounds'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_background')
      table.string('titulo', 50)
      table.string('subtitulo', 100)
      table.string('historia', 5000)
      table.string('aparencia', 5000)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

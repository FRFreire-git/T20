import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tb_backgrounds'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id_background', {primaryKey: true})
      table.string('titulo', 50)
      table.string('subtitulo', 100)
      table.string('historia', 5000)
      table.string('aparencia', 5000)
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

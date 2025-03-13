import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tb_jogadores'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id_jogador', {primaryKey: true})
      table.string('nome_personagem', 100)
      table.string('nome_jogador', 100)
      table.integer('nivel_jogador')
      table.integer('forca_jogador')
      table.integer('destreza_jogador')
      table.integer('constituicao_jogador')
      table.integer('inteligencia_jogador')
      table.integer('sabedoria_jogador')
      table.integer('carisma_jogador')
      table.integer('ponto_xp')
      table.string('foto_jogador', 1000)
      table.integer('valor_total')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

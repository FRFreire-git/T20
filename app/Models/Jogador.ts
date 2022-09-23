import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TbJogador extends BaseModel {
  @column({ isPrimary: true })
  public id_jogador: number

  @column()
  public nome_personagem: string

  @column()
  public nome_jogador: string

  @column()
  public nivel_jogador: number

  @column()
  public forca_jogador: number

  @column()
  public destreza_jogador: number

  @column()
  public constituicao_jogador: number

  @column()
  public inteligencia_jogador: number

  @column()
  public sabedoria_jogador: number

  @column()
  public carisma_jogador: number

  @column()
  public ponto_xp: number

  @column()
  public foto_personagem: string | null | undefined

  @column()
  public valor_total: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TbDefesa extends BaseModel {
  @column({ isPrimary: true })
  public id_defesa: number

  @column()
  public nome_defesa: string

  @column()
  public descricao_defesa: string

  @column()
  public tipo_defesa: string

  @column()
  public peso_defesa: string

  @column()
  public bonus_ca: number

  @column()
  public penalidade_defesa: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

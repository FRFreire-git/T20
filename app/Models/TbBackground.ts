import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TbBackground extends BaseModel {
  @column({ isPrimary: true })
  public id_background: number

  @column()
  public titulo: string

  @column()
  public subtitulo: string

  @column()
  public historia: string

  @column()
  public aparencia: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TbArma extends BaseModel {
  @column({ isPrimary: true })
  public id_arma: number

  @column()
  public nome_arma: string

  @column()
  public descricao_arma: string

  @column()
  public municao_arma: number

  @column()
  public habilidade_arma: string

  @column()
  public preco_arma: number

  @column()
  public dano_arma: string

  @column()
  public critico_arma: string

  @column()
  public alcance_arma: string

  @column()
  public peso_arma: number

  @column()
  public tipo_ataque: string

  @column()
  public tipo_arma: string

  @column()
  public qt_mao: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Administrator extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public main_office: String

  @column()
  public responsabilities: String

  @column()
  public status: number

  @column()
  public user_id: string   // no es foreign key porque no pertenece al dominio, es decir a la misma base de datos
}

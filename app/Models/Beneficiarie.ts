import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Beneficiarie extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public customer_id: number;

  @column()
  public holder_id: number;
  
  @column()
  public isprincipal_beneficiarie: boolean;

  @column()
  public is_emergy_contact: boolean;

  @column()
  public status: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

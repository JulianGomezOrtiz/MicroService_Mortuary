import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
// import User from './User'

export default class Administrator extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  // @column()
  // public user_id: string;

  @column()
  public main_office: String;

  @column()
  public responsabilities: String;

  @column()
  public status: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  // @belongsTo(() => User, {
  //   foreignKey: "User_id",
  // })
  // public user: BelongsTo<typeof User>;

  //relacion 1 a 1 con headquarter...
}

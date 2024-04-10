import { DateTime } from "luxon";
import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Holder from "./Holder";

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number;
  
  @column()
  public user_id: string;
  
  @column()
  public plan_id: string;
  
  @column()
  public status: number;
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;
  
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Holder,
  {
    foreignKey: 'customer_id'
  })
public holders: HasMany<typeof Holder>

  
}

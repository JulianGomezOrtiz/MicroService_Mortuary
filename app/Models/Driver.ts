import { DateTime } from "luxon";
import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import ServiceExecution from "./ServiceExecution";

export default class Driver extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public user_id: string;

  @column()
  public vehicle: string;

  @column()
  public model: string;

  @column()
  public capacity: number;

  @column()
  public status: number;

  @column()
  public user: any;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => ServiceExecution, {
    foreignKey: "driver_id",
  })
  public serviceExecutions: HasMany<typeof ServiceExecution>;
}

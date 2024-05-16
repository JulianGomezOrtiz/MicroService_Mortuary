import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  HasMany,
  belongsTo,
  column,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import ServiceExecution from "./ServiceExecution";
// import User from "./User";

export default class Driver extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public user_id: string;

  @column()
  public name: string;

  @column()
  public vehicle: string;

  @column()
  public model: string;

  @column()
  public phone_number: string;

  @column()
  public capacity: number;

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

  @hasMany(() => ServiceExecution, {
    foreignKey: "customer_id",
  })
  public serviceExecutions: HasMany<typeof ServiceExecution>;
}

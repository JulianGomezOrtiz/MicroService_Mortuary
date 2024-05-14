import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  HasMany,
  belongsTo,
  column,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Department from "./Department";
import City from "./City";
import Room from "./Room";

export default class Headquarter extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public capacity: number;

  @column()
  public city_id: number;

  @column()
  public status: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => City, {
    foreignKey: "city_id",
  })
  public city: BelongsTo<typeof City>;

  @hasMany(() => Room,{
    foreignKey: "headquarter_id"
  })
  public room: HasMany<typeof Room>
}

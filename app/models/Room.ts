import { DateTime } from "luxon";
import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Headquarter from "./Headquarter";

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public capacity: number;

  @column()
  public headquarter_id: Headquarter;

  @column()
  public status: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Headquarter, {
    foreignKey: "movie_id",
  })
  public Headquarters: HasMany<typeof Headquarter>;
}

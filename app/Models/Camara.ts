import { DateTime } from "luxon";
import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Transmision from "./Transmision";

export default class Camara extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public ancho: number;

  @column()
  public alto: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Transmision, {
    foreignKey: "camara_id",
  })
  public transmision: HasMany<typeof Transmision>;
  
}

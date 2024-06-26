import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Service from "./Service";
import Room from "./Room";

export default class Burial extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public service_id: number;

  @column()
  public room_id: number;

  @column()
  public description: string;

  @column()
  public location: string;

  @column()
  public status: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Service, {
    foreignKey: "service_id",
  })
  public service: BelongsTo<typeof Service>;

  @belongsTo(() => Room, {
    foreignKey: "room_id",
  })
  public room: BelongsTo<typeof Room>;
}

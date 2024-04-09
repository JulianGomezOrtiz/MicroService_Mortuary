import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public id_customer: string;

  @column()
  public id_room: string;

  @column()
  public id_driver: string;

  @column()
  public body_ubication: String;

  @column()
  public need_trip: boolean;

  @column()
  public status: number;

  //three foreign keys
}

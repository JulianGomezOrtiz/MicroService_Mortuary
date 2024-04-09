import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class ServiceExecution extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public id_service: string;

  @column()
  public id_customer: string;

  @column()
  public id_room: string;

  @column()
  public headquarters: string;

  @column()
  public location: string;

  @column()
  public status: number;

  //three foreign keys
}

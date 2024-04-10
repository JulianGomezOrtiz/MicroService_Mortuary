import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class ServiceExecution extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public service_id: string;

  @column()
  public customer_id: string;

  @column()
  public driver_id: number;

  @column()
  public room_id: string;

  @column()
  public main_office: string;

  @column()
  public location: string;

  @column()
  public status: number;
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}

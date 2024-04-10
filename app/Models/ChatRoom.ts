import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class ChatRoom extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public service_execution_id: number;

  @column()
  public holder_id: number;

  @column()
  public name: String;

  @column()
  public code: String;

  @column()
  public status: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}

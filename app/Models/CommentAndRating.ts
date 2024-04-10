import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class CommentAndRating extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public service_execution_id: number;

  @column()
  public customer_id: number;

  @column()
  public description: string;

  @column()
  public rating: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}

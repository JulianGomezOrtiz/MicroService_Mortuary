import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Holder from "./Holder";

export default class ChatRoom extends BaseModel {
  public static table = "chatrooms";
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

  @belongsTo(() => Holder, {
    foreignKey: "holder_id",
  })
  public holder: BelongsTo<typeof Holder>;
}

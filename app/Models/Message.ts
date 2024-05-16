import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import ChatRoom from "./ChatRoom";

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public user_id: string;

  @column()
  public chatRoom_id: number;

  @column()
  public message: string;

  @column()
  public date: Date;

  @column()
  public status: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  // @belongsTo(() => User, {
  //   foreignKey: "User_id",
  // })
  // public user: BelongsTo<typeof User>;

  @belongsTo(() => ChatRoom, {
    foreignKey: "ChatRoom_id",
  })
  public chatRoom: BelongsTo<typeof ChatRoom>;
}

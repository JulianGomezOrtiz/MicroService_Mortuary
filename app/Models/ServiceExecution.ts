import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  HasMany,
  HasOne,
  belongsTo,
  column,
  hasMany,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Customer from "./Customer";
import Service from "./Service";
import CommentAndRating from "./CommentAndRating";
import Driver from "./Driver";
import ChatRoom from "./ChatRoom";

export default class ServiceExecution extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public service_id: number;

  @column()
  public customer_id: number;

  @column()
  public driver_id: number;

  @column()
  public room_id: number;

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

  @hasOne(() => ChatRoom, {
    foreignKey: "service_execution_id",
  })
  public chat_room: HasOne<typeof ChatRoom>;

  @belongsTo(() => Customer, {
    foreignKey: "customer_id",
  })
  public customer: BelongsTo<typeof Customer>;

  @belongsTo(() => Service, {
    foreignKey: "service_id",
  })
  public service: BelongsTo<typeof Service>;

  @belongsTo(() => Driver, {
    foreignKey: "driver_id",
  })
  public driver: BelongsTo<typeof Driver>;

  @hasMany(() => CommentAndRating, {
    foreignKey: "service_execution_id",
  })
  public commentAndRatings: HasMany<typeof CommentAndRating>;
}

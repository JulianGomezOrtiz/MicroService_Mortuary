import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  HasMany,
  belongsTo,
  column,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Customer from "./Customer";
import Beneficiarie from "./Beneficiarie";
import ChatRoom from "./ChatRoom";

export default class Holder extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public customer_id: number;

  @column()
  public status: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Customer, {
    foreignKey: "customer_id",
  })
  public customer: BelongsTo<typeof Customer>;

  @hasMany(() => Beneficiarie, {
    foreignKey: "holder_id",
  })
  public beneficiaries: HasMany<typeof Beneficiarie>;

  @hasMany(() => ChatRoom, {
    foreignKey: "holder_id",
  })
  public chatrooms: HasMany<typeof ChatRoom>;
}

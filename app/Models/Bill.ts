import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Membership from "./Membership";

export default class Bill extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public customer_id: number;

  @column()
  public membership_id: number;

  @column()
  public payment_method_id: string;

  @column()
  public price: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Membership, {
    foreignKey: "membership_id",
  })
  public membership: BelongsTo<typeof Membership>;
}

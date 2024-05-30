import { DateTime } from "luxon";
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Customer from "./Customer";
import Plan from "./Plan";
import Bill from "./Bill";

export default class Membership extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public plan_id: number;

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

  @belongsTo(() => Plan, {
    foreignKey: "plan_id",
  })
  public plan: BelongsTo<typeof Plan>;

  @hasMany(() => Bill, {
    foreignKey: "membership_id",
  })
  public bill: HasMany<typeof Bill>;
}

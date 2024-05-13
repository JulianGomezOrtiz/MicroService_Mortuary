import { DateTime } from "luxon";
import {
  BaseModel,
  ManyToMany,
  column,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Customer from "./Customer";

export default class Plan extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public number_of_beneficiaries: number;

  @column()
  public price: number;

  @column()
  public discount: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @manyToMany(() => Customer, {
    pivotTable: "memberships",
    pivotForeignKey: "plan_id",
    pivotRelatedForeignKey: "customer_id",
  })
  public customers: ManyToMany<typeof Customer>;
}

import { DateTime } from "luxon";
import {
  BaseModel,
  ManyToMany,
  column,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Customer from "./Customer";

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public customer_id: number;

  @column()
  public ceremony_id: number;

  @column()
  public body_ubication: String;

  @column()
  public need_trip: boolean;

  @column()
  public status: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @manyToMany(() => Customer, {
    pivotTable: "service_executions",
    pivotForeignKey: "service_id",
    pivotRelatedForeignKey: "customer_id",
  })
  public customers: ManyToMany<typeof Customer>;
}

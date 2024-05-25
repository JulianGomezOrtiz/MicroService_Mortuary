import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  HasOne,
  belongsTo,
  column,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import ServiceExecution from "./ServiceExecution";
import Customer from "./Customer";
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

  @belongsTo(() => ServiceExecution, {
    foreignKey: "ServiceExecution_id",
  })
  public serviceExecution: BelongsTo<typeof ServiceExecution>;

  @hasOne(() => Customer, {
    foreignKey: "Customer_id",
  })
  public customer: HasOne<typeof Customer>;
}

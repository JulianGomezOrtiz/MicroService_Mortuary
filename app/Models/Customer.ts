import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  HasMany,
  ManyToMany,
  belongsTo,
  column,
  hasMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Holder from "./Holder";
import Beneficiarie from "./Beneficiarie";
import Service from "./Service";
import Plan from "./Plan";
import CommentAndRating from "./CommentAndRating";

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public user_id: string;

  @column()
  public user: any;

  @column()
  public status: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => CommentAndRating, {
    foreignKey: "customer_id",
  })
  public commentAndRatings: BelongsTo<typeof CommentAndRating>;

  @hasMany(() => Holder, {
    foreignKey: "customer_id",
  })
  public holders: HasMany<typeof Holder>;

  @hasMany(() => Beneficiarie, {
    foreignKey: "customer_id",
  })
  public beneficiaries: HasMany<typeof Beneficiarie>;

  @manyToMany(() => Service, {
    pivotTable: "service_executions",
    pivotForeignKey: "customer_id",
    pivotRelatedForeignKey: "service_id",
  })
  public services: ManyToMany<typeof Service>;

  @manyToMany(() => Plan, {
    pivotTable: "memberships",
    pivotForeignKey: "customer_id",
    pivotRelatedForeignKey: "plan_id",
  })
  public plans: ManyToMany<typeof Plan>;
}

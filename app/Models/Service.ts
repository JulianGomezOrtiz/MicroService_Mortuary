import { DateTime } from "luxon";
import {
  BaseModel,
  HasMany,
  ManyToMany,
  column,
  hasMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Customer from "./Customer";
import Cremation from "./Cremation";
import Burial from "./Burial";
import Relocation from "./Relocation";

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

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

  @hasMany(() => Cremation, {
    foreignKey: "service_id",
  })
  public cremations: HasMany<typeof Cremation>;

  @hasMany(() => Burial, {
    foreignKey: "service_id",
  })
  public burials: HasMany<typeof Burial>;

  @hasMany(() => Relocation, {
    foreignKey: "service_id",
  })
  public relocations: HasMany<typeof Relocation>;
  
}

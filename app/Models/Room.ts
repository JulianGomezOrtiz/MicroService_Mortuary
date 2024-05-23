import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  HasMany,
  belongsTo,
  column,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Headquarter from "./Headquarter";

//import ServiceExecution from "./ServiceExecution";

import Burial from "./Burial";
import Cremation from "./Cremation";

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public capacity: number;

  @column()
  public headquarter_id: number;

  @column()
  public status: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Headquarter, {
    foreignKey: "headquarter_id",
  })
  public headquarter: BelongsTo<typeof Headquarter>;

  // @hasMany(() => ServiceExecution, {
  //   foreignKey: "room_id",
  // })
  // public serviceExecution: HasMany<typeof ServiceExecution>;

  // con el cambio que se hizo de ceremonias por Relocation, Burial, y Cremation

  @hasMany(() => Burial, {
    foreignKey: "room_id",
  })
  public burials: HasMany<typeof Burial>;

  @hasMany(() => Cremation, {
    foreignKey: "room_id",
  })
  public cremations: HasMany<typeof Cremation>;
}

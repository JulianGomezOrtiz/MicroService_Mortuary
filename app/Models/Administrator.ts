import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Headquarter from "./Headquarter";
// import User from './User'

export default class Administrator extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public user_id: string;

  @column()
  public responsabilities: String;

  @column()
  public status: number;

  @column()
  public user: any;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

//   @belongsTo(() => Headquarter, {
//     foreignKey: "Headquarter_id",
//   })
//   public headquarter: BelongsTo<typeof Headquarter>;
}

import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Camara from "./Camara";
import ServiceExecution from "./ServiceExecution";

export default class Transmision extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public fecha_inicio: DateTime;

  @column()
  public fecha_fin: DateTime;

  @column()
  public camara_id: number;

  @column()
  public service_execution_id: number;

  @belongsTo(() => Camara, {
    foreignKey: "camara_id",
  })
  public camara: BelongsTo<typeof Camara>;

  @belongsTo(() => ServiceExecution, {
    foreignKey: "service_execution_id",
  })
  public serviceExecutions: BelongsTo<typeof ServiceExecution>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}

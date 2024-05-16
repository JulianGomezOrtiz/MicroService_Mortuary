import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Camara from "./Camara";
import ServiceExecution from "./ServiceExecution";

export default class Transmision extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public fechaInicio: DateTime;

  @column()
  public fechaFin: DateTime;

  @column()
  public camara_id: number;

  @column()
  public service_execution_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Camara, {
    foreignKey: "Camara_id",
  })
  public Camara: BelongsTo<typeof Camara>;

  @belongsTo(() => ServiceExecution, {
    foreignKey: "service_execution_id",
  })
  public service_execution: BelongsTo<typeof ServiceExecution>;
}

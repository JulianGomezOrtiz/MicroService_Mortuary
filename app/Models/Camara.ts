import { DateTime } from "luxon";
import {
  BaseModel,
  ManyToMany,
  column,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import ServiceExecution from "./ServiceExecution";

export default class Camara extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public ancho: number;

  @column()
  public alto: number;

  @manyToMany(() => ServiceExecution, {
    pivotTable: "transmisions",
    pivotForeignKey: "camara_id",
    pivotRelatedForeignKey: "service_execution_id",
  })
  public serviceExecutions: ManyToMany<typeof ServiceExecution>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}

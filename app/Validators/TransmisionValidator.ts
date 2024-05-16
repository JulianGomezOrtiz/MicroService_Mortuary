import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class TransmisionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fechaInicio: schema.date({ format: "yyyy-MM-dd HH:mm:ss" }),
    fechaFin: schema.date({ format: "yyyy-MM-dd HH:mm:ss" }),
    camara_id: schema.number([
      rules.exists({
        table: "camaras",
        column: "id",
        // where: {
        //   camara_id: this.ctx.request.body()["camara_id"],
        // }
      }),
      // rules.unique({
      //   table: "transmisions",
      //   column: "id",
      //   caseInsensitive: true,
      //   where: {
      //     camara_id: this.ctx.request.body()["camara_id"],
      //   },
      // }),
    ]),
    service_execution_id: schema.number([
      rules.exists({
        table: "service_executions",
        column: "id",
        // where: {
        //   service_executions_id:
        //     this.ctx.request.body()["service_executions_id"],
        //   status: true,
        // },
      }),
    ]),
  });

  public messages: CustomMessages = {};
}

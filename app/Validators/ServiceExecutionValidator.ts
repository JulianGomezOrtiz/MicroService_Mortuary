import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ServiceExecutionValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    service_id: schema.number([
      rules.exists({ table: "services", column: "id" }),
    ]),
    customer_id: schema.number([
      rules.exists({ table: "customers", column: "id" }),
    ]),
    driver_id: schema.number([
      rules.exists({ table: "drivers", column: "id" }),
      rules.unique({
        table: "service_executions",
        column: "driver_id",
        caseInsensitive: true,
        where: {
          driver_id: this.ctx.request.body()["driver_id"],
          status: true,
        },
      }),
    ]),
    room_id: schema.number([
      rules.exists({ table: "rooms", column: "id" }),
      rules.unique({
        table: "service_executions",
        column: "room_id",
        caseInsensitive: true,
        where: {
          room_id: this.ctx.request.body()["room_id"],
          status: true,
        },
      }),
    ]),
    main_office: schema.string(),
    location: schema.string(),
    status: schema.number([rules.range(0, 1)]),
  });
  public messages: CustomMessages = {
    "service_id.exists":
      "El ID del servicio proporcionado no existe en la base de datos.",
    "customer_id.exists":
      "El ID del cliente proporcionado no existe en la base de datos.",
    "driver_id.exists":
      "El ID del conductor proporcionado no existe en la base de datos.",
    "driver_id.unique":
      "Ya existe una ejecución de servicio con el mismo conductor.",
    "room_id.exists":
      "El ID de la habitación proporcionado no existe en la base de datos.",
    "room_id.unique":
      "Ya existe una ejecución de servicio con la misma habitación.",
    "main_office.required": "El campo 'main_office' es obligatorio.",
    "location.required": "La ubicación es obligatoria",
    "status.range": "El campo 'status' debe estar dentro del rango de 0 a 1.",
  };
}

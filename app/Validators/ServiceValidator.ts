import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ServiceValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    customer_id: schema.number([
      rules.exists({ table: "customers", column: "id" }),
    ]),
    ceremony_id: schema.number([
      rules.exists({ table: "customers", column: "id" }),
    ]),
    body_ubication: schema.string(),
    need_trip: schema.boolean(),
    status: schema.number([rules.range(0, 1)]),
  });
  public messages: CustomMessages = {
    "customer_id.exists":
      "El ID del cliente proporcionado no existe en la base de datos.",
    "ceremony_id.exists":
      "El ID de la ceremonia proporcionado no existe en la base de datos.",
    "body_ubication.required": "La ubicación del cuerpo es obligatoria.",
    "need_trip.required": "El indicador de necesidad de viaje es obligatorio.",
    "status.range": "El campo 'status' debe estar dentro del rango de 0 a 1.",
  };
}

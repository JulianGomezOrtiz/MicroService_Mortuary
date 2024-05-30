import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CremationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    service_id: schema.number([
      rules.exists({
        table: "services",
        column: "id",
      }),
    ]),
    room_id: schema.number([
      rules.exists({
        table: "rooms",
        column: "id",
      }),
    ]),
    cremation_date: schema.date({ format: "yyyy-MM-dd HH:mm:ss" }),

    status: schema.number([rules.range(0, 1)]),
  });

  public messages: CustomMessages = {
    "service_id.exists":
      "El ID del cliente proporcionado no existe en la base de datos.",
    "room_id.exists":
      "El ID del cliente proporcionado no existe en la base de datos.",
    "cremation_date.date":
      "La fecha no cumple con el formato: yyyy-MM-dd HH:mm:ss",
    "status.range": "El campo 'status' debe estar dentro del rango de 0 a 1.",
  };
}

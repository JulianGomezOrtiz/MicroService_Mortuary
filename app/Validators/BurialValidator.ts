import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class BurialValidator {
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

    description: schema.string([rules.minLength(0), rules.maxLength(150)]),

    location: schema.string([rules.minLength(5), rules.maxLength(20)]),

    status: schema.number([rules.range(0, 1)]),
  });

  public messages: CustomMessages = {
    "service_id.exists":
      "El ID del servicio proporcionado no existe en la base de datos.",
    "room_id.exists":
      "El ID de la room proporcionado no existe en la base de datos.",
    "location.minLength": "La ubicación debe tener mínimo 5 caracteres",
    "location.manLength": "La ubicación debe tener máximo 20 caracteres",
    "status.range": "El campo 'status' debe estar dentro del rango de 0 a 1.",
  };
}

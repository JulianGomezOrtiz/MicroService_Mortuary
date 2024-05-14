import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class DriverValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    driver_id: schema.number([
      rules.exists({ table: "drivers", column: "id" }),
    ]),
    is_emergy_contact: schema.boolean(),
    status: schema.number([rules.range(0, 1)]),
  });
  public messages: CustomMessages = {
    "driver_id.exists":
      "El ID del conductor proporcionado no existe en la base de datos.",
    "status.range": "El campo 'status' debe estar dentro del rango de 0 a 1.",
  };
}

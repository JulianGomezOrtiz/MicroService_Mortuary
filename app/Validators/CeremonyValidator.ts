import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CeremonyValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    user_id: schema.number([rules.exists({ table: "users", column: "id" })]),
    holder_id: schema.number([
      rules.exists({ table: "ceremony", column: "id" }),
    ]),
    status: schema.number([rules.range(0, 1)]),
  });
  public messages: CustomMessages = {
    "user_id.exists":
      "El ID de la ceremonia proporcionado no existe en la base de datos.",
    "status.range": "El campo 'status' debe estar dentro del rango de 0 a 1.",
  };
}

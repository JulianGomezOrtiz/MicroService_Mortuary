import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AdministratorValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    customer_id: schema.number([
      rules.exists({ table: "customers", column: "id" }),
      rules.unique({
        table: "administrators",
        column: "user_id",
        caseInsensitive: true,
        where: {
          user_id: this.ctx.request.body()["user_id"],
          status: 1,
        },
      }),
    ]),
    status: schema.number([rules.range(0, 1)]),
  });
  public messages: CustomMessages = {
    "user_id.exists":
      "El ID del usuario proporcionado no existe en la base de datos.",
    "user_id.unique":
      "El ID del usuario proporcionado ya tiene un Administrador asociado.",
    "status.range": "El campo 'status' debe estar dentro del rango de 0 a 1.",
  };
}

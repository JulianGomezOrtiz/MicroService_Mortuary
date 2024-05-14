import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class HolderValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    customer_id: schema.number([
      rules.exists({ table: "customers", column: "id" }),
      rules.unique({
        table: "holders",
        column: "customer_id",
        caseInsensitive: true,
        where: {
          customer_id: this.ctx.request.body()["customer_id"],
        },
      }),
    ]),
    status: schema.number([rules.range(0, 1)]),
  });
  public messages: CustomMessages = {
    "customer_id.exists":
      "El ID del cliente proporcionado no existe en la base de datos.",
    "customer_id.unique":
      "El ID del cliente proporcionado ya tiene un titular asociado.",
    "status.range": "El campo 'status' debe estar dentro del rango de 0 a 1.",
  };
}

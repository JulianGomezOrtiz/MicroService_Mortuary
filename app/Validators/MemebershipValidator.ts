import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class MemebershipValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string(),
    plan_id: schema.number([rules.exists({ table: "plans", column: "id" })]),
    customer_id: schema.number([
      rules.exists({ table: "customers", column: "id" }),
      rules.unique({
        table: "memberships",
        column: "customer_id",
        caseInsensitive: true,
        where: { customer_id: this.ctx.request.body()["customer_id"] },
      }),
    ]),
    date: schema.date(),
    status: schema.number([rules.range(0, 1)]),
  });

  public messages: CustomMessages = {
    "name.required": "El nombre es obligatorio.",
    "plan_id.exists":
      "El ID del plan proporcionado no existe en la base de datos.",
    "customer_id.exists":
      "El ID del cliente proporcionado no existe en la base de datos.",
    "customer_id.unique": "Ya hay una membresía asociada a este cliente.",
    "date.required": "La fecha es obligatoria.",
    "date.date": "El campo 'date' debe ser una fecha válida.",
    "status.range": "El campo 'status' debe estar dentro del rango de 0 a 1.",
  };
}

import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class BillValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    customer_id: schema.number([
      rules.exists({
        table: "customers",
        column: "id",
      }),
    ]),
    membership_id: schema.number([
      rules.exists({
        table: "memberships",
        column: "id",
      }),
    ]),
    payment_method_id: schema.string([rules.minLength(5)]),

    price: schema.number([rules.range(1, 5000000)]),
  });

  public messages: CustomMessages = {
    "membership_id.exists":
      "El ID de la memebresía proporcionado no existe en la base de datos.",
    "payment_method_id.minLength":
      "El método de pago, debe contener como minimo 5 caracteres",
  };
}

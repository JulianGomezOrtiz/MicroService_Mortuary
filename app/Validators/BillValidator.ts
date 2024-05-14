import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class BillValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    membership_id: schema.number([
      rules.exists({ table: "memberships", column: "id" }),
    ]),
    payment_method_id:schema.string([rules.minLength(5)])        // la tabla está en spring boot(no hay tabla en adonis)//regla para evitar error
  });

  public messages: CustomMessages = {};
}

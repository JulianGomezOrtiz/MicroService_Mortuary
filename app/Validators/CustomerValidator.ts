import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CustomerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    status: schema.number([rules.range(0, 1)]),
  });

  public messages: CustomMessages = {
    "status.range": "El campo 'status' debe estar dentro del rango de 0 a 1.",
  };
}

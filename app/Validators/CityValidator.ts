import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.maxLength(20), rules.minLength(5)]),
    department_id: schema.number([rules.exists({ table: "departments", column: "id" })]),
    status: schema.number([rules.range(0, 1)]),
  });

  public messages: CustomMessages = {};
}

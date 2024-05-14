import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class HeadquarterValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string([rules.maxLength(20), rules.minLength(5)]),
    description: schema.string([rules.maxLength(100), rules.minLength(5)]),
    capacity: schema.number([rules.range(0, 100)]),
    city_id: schema.number([rules.exists({ table: "cities", column: "id" })]),
    status: schema.number([rules.range(0, 1)]),
  });
  public messages: CustomMessages = {};
}

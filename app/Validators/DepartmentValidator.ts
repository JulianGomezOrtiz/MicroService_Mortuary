import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class DepartmentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.maxLength(20), rules.minLength(5)]),
    location: schema.string([rules.maxLength(15), rules.minLength(5)]),
    status: schema.number([rules.range(0, 1)]),
  });

  public messages: CustomMessages = {
    "name.maxLength": "El numero máximo de caracteres permitido es de 20",
    "name.minLength": "El numero mínimo de caracteres necesarios es de 5",
    "status.range": "El estado debe estar entre 0 y 1",
  };
}

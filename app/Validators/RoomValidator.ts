import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RoomValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string([rules.maxLength(20), rules.minLength(5)]),
    description: schema.string([rules.maxLength(50), rules.minLength(5)]),
    capacity: schema.number([rules.range(0, 25)]),
    headquarter_id: schema.number([
      rules.exists({ table: "headquarters", column: "id" }),
    ]),
    status: schema.number([rules.range(0, 1)]),
  });
  public messages: CustomMessages = {
    "name.maxLength": "El numero máximo de caracteres permitido es de 20",
    "name.minLength": "El numero mínimo de caracteres necesarios es de 5",
    "description.maxLength":
      "El numero máximo de caracteres permitido es de 100",
    "description.minLength":
      "El numero mínimo de caracteres necesarios es de 5",
    "capacity.range": "la capacidad debe estár contenida entre 0 a 25",
    "headquarter_id.exists":
      "El id de la sede no está registrado en la base de datos",
    "status.range": "El estado debe estar entre 0 y 1",
  };
}

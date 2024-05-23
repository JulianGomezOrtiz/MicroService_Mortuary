import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class HeadquarterValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    administrator_id: schema.number([
      rules.exists({ table: "administrators", column: "id", caseInsensitive: false }),
    ]),
    name: schema.string([rules.maxLength(20), rules.minLength(5)]),
    description: schema.string([rules.maxLength(100), rules.minLength(5)]),
    capacity: schema.number([rules.range(0, 100)]),
    city_id: schema.number([
      rules.exists({ table: "cities", column: "id", caseInsensitive: false }),
    ]),
    status: schema.number([rules.range(0, 1)]),
  });
  public messages: CustomMessages = {
    "admnistrator_id.exists":
      "El id del administrador no está registrado no está registrado en la base de datos",
    "name.maxLength": "El numero máximo de caracteres permitido es de 20",
    "name.minLength": "El numero mínimo de caracteres necesarios es de 5",
    "description.maxLength":
      "El numero máximo de caracteres permitido es de 100",
    "description.minLength":
      "El numero mínimo de caracteres necesarios es de 5",
    "capacity.range": "la capacidad debe estár contenida entre 0 a 100",
    "city_id.exists":
      "El id de la ciudad no está registrado en la base de datos",
    "status.range": "El estado debe estar entre 0 y 1",
  };
}

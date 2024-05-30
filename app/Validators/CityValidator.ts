import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.maxLength(20), rules.minLength(5)]),
    department_id: schema.number([
      rules.exists({ table: "departments", column: "id" }), // Solo verifica la existencia del department_id en la tabla departments
      rules.unique({ table: "cities", column: "department_id" })
    ]),
    status: schema.number([rules.range(0, 1)])
  });

  public messages: CustomMessages = {
    "name.maxLength": "El número máximo de caracteres permitido es de 20",
    "name.minLength": "El número mínimo de caracteres necesarios es de 5",
    "department_id.exists": "El Id del departamento no existe en la base de datos",
    "department_id.unique": "El Id del departamento ya existe para esta ciudad",
    "status.range": "El estado debe estar entre 0 y 1"
  };
}

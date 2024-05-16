import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class TransmisionValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    fecha_inicio: schema.date({
      format: "yyyy-MM-dd HH:mm:ss",
    }),
    fecha_fin: schema.date({
      format: "yyyy-MM-dd HH:mm:ss",
    }),
    camara_id: schema.number([
      rules.exists({ table: "camaras", column: "id" }),
    ]),
    service_execution_id: schema.number([
      rules.exists({ table: "service_executions", column: "id" }),
    ]),
  });
  public messages: CustomMessages = {
    "fecha_inicio.required": "La fecha de inicio es obligatoria.",
    "fecha_inicio.format":
      "La fecha debe tener el siguiente formato 'yyyy-MM-dd HH:mm:ss'.",
    "fecha_fin.required": "La fecha de fin es obligatoria.",
    "fecha_fin.format":
      "La fecha debe tener el siguiente formato 'yyyy-MM-dd HH:mm:ss'.",
    "camara_id.exists":
      "El ID de la camara proporcionada no existe en la base de datos.",
    "service_execution_id.exists":
      "El ID del serivicio en ejecución proporcionado no existe en la base de datos.",
  };
}

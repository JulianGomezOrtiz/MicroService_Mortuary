import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CommentAndRatingValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    id: schema.number([
      rules.exists({ table: "commentsandratings", column: "id" }),
    ]),
    service_execution_id: schema.number([
      rules.exists({ table: "service_executions", column: "id" }),
    ]),
    customer_id: schema.number([
      rules.exists({ table: "customers", column: "id" }),
    ]),

    description: schema.string([rules.minLength(0), rules.maxLength(150)]),

    rating: schema.number([rules.range(1, 5)]),
  });

  public messages: CustomMessages = {
    "service_execution_id.exists":
      "El ID del service_execution proporcionado no existe en la base de datos.",
    "customer_id.exists":
      "El ID del cliente proporcionado no existe en la base de datos",
    "description.minLength": "La ubicación debe tener mínimo 0 caracteres",
    "description.maxLength": "La ubicación debe tener máximo 150 caracteres",
    "rating.range": "La calificacion debe estar dentro del rango de 1,5.",
  };
}

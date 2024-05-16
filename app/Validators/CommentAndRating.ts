import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CommentAndRatingValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    id: schema.number([
      rules.exists({ table: "commentsandratings", column: "id" }),
    ]),
    service_execution_id: schema.number([
      rules.exists({ table: "service-execution", column: "id" }),
    ]),
    customer_id: schema.number([
      rules.exists({ table: "customers", column: "id" }),
    ]),
    status: schema.number([rules.range(0, 1)]),
  });
  public messages: CustomMessages = {
    "id.exists":
      "El ID del comentario/rating proporcionado no existe en la base de datos.",
    "service_execution_id.exists":
      "El ID del service_execution proporcionado no existe en la base de datos.",
    "customer_id.exists":
      "El ID del cliente proporcionado no existe en la base de datos.z",
    "status.range": "El campo 'status' debe estar dentro del rango de 0 a 1.",
  };
}

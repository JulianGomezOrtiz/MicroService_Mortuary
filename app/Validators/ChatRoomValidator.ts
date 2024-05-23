import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ChatRoomValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    service_execution_id: schema.number([
      rules.exists({ table: "service_executions", column: "id" }),
    ]),
    holder_id: schema.number([
      rules.exists({ table: "holders", column: "id" }),
    ]),
    name: schema.string([rules.minLength(5), rules.maxLength(25)]),
    code: schema.string([rules.minLength(0), rules.maxLength(32)]),
    status: schema.number([rules.range(0, 1)]),
  });
  public messages: CustomMessages = {
    "chatroom_id.exists":
      "El ID del chatroom proporcionado no existe en la base de datos.",
    "holder_id.exists":
      "El ID del service execution proporcionado no existe en la base de datos.",
    "name.minLength": "El nombre debe tener mínimo 5 caracteres",
    "name.maxLength": "El nombre debe tener máximo 25 caracteres",
    "code.minLength": "El código debe tener mínimo 0 caracteres",
    "code.maxLength": "El código debe tener máximo 32 caracteres",
    "stats.range":
      "El estado se debe encontrar entre los valores 0 y 1, donde 0 es inactivo y 1 activo",
  };
}

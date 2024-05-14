import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class MessageValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    user_id: schema.number([
      rules.exists({ table: "users", column: "id" }),
    ]),
    holder_id: schema.number([
      rules.exists({ table: "chatroom", column: "id" }),
    ]),
    isprincipal_Message: schema.boolean([
      rules.unique({
        table: "Messages",
        column: "isprincipal_Message",
        caseInsensitive: true,
        where: {
          holder_id: this.ctx.request.body()["holder_id"],
          isprincipal_Message: true,
        },
      }),
    ]),
    is_emergy_contact: schema.boolean(),
    status: schema.number([rules.range(0, 1)]),
  });
  public messages: CustomMessages = {
    "user_id.exists":
      "El ID del usuario proporcionado no existe en la base de datos.",
    "holder_id.exists":
      "El ID del chatroom proporcionado no existe en la base de datos.",
    "isprincipal_Message.unique":
      "El beneficiario principal ya está registrado para este chatroom.",
    "status.range": "El campo 'status' debe estar dentro del rango de 0 a 1.",
  };
}

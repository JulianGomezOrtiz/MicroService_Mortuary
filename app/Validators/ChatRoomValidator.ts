import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ChatRoomValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    chatroom_id: schema.number([
      rules.exists({ table: "chatrooms", column: "id" }),
    ]),
    holder_id: schema.number([
      rules.exists({ table: "holders", column: "id" }),
    ]),
    isprincipal_beneficiarie: schema.boolean([
      rules.unique({
        table: "service-execution",
        column: "id",
        caseInsensitive: true,
        where: {
          holder_id: this.ctx.request.body()["holder_id"],
          id: true,
        },
      }),
    ]),
    is_emergy_contact: schema.boolean(),
    status: schema.number([rules.range(0, 1)]),
  });
  public messages: CustomMessages = {
    "chatroom_id.exists":
      "El ID del chatroom proporcionado no existe en la base de datos.",
    "holder_id.exists":
      "El ID del service execution proporcionado no existe en la base de datos.",
    "id.unique":
      "El servicio ya posee un chatroom.",
    "status.range": "El campo 'status' debe estar dentro del rango de 0 a 1.",
  };
}

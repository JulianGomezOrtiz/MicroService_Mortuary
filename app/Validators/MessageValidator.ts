import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class MessageValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    // user_id: schema.number([
    //   rules.exists({ table: "users", column: "id" }),
    // ]),
    chat_room_id: schema.number([
      rules.exists({ table: "chat_rooms", column: "id" }),
    ]),
    message: schema.string([rules.minLength(1), rules.maxLength(120)]),
    date: schema.date({ format: "yyyy-MM-dd HH:mm:ss" }),
    status: schema.number([rules.range(0, 1)]),
  });



  public messages: CustomMessages = {
    "chat_room_id.exists":
      "El ID del chatRoom proporcionado no existe en la base de datos.",
    "message.boolean": "El mensaje permite dos estados: true / false",
    "date.date":
      "La fecha ingresada no cumple con el formato: yyyy-MM-dd HH:mm:ss",
    "status.range": "El campo 'status' debe estar dentro del rango de 0 a 1.",
  };
}

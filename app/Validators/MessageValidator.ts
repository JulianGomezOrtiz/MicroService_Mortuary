import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class MessageValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    chatRoom_id: schema.number([
      rules.exists({ table: "chatrooms", column: "id" }),
    ]),
    message: schema.string([rules.minLength(1), rules.maxLength(120)]),
    date: schema.date({ format: "yyyy-MM-dd HH:mm:ss" }),
    status: schema.number([rules.range(0, 1)]),
  });

  public messages: CustomMessages = {
    "chatRoom_id.exists":
      "El ID del chatRoom proporcionado no existe en la base de datos.",
    "message.string":
      "El mensaje debe ser tener una longitud mayor a 1 y menor a 120 carácteres",
    "date.date":
      "La fecha ingresada no cumple con el formato: yyyy-MM-dd HH:mm:ss",
    "status.range": "El campo 'status' debe estar dentro del rango de 0 a 1.",
  };
}

import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CremationValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    service_id: schema.number([
      rules.exists({
        table: "services",
        column: "id",
        where: { service_id: this.ctx.request.body()["service_id"] },
      }),
    ]),
    room_id: schema.number([
      rules.exists({
        table: "rooms",
        column: "id",
        where: { room_id: this.ctx.request.body()["room_id"] },
      }),
    ]),
    cremation_date: schema.date({ format: "yyyy-MM-dd HH:mm:ss" }),

    status: schema.number([rules.range(0, 1)]),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    "service_id.exists":
      "El ID del cliente proporcionado no existe en la base de datos.",
    "room_id.exists":
      "El ID del cliente proporcionado no existe en la base de datos.",
    "cremation_date.date":
      "La fecha no cumple con el formato: yyyy-MM-dd HH:mm:ss",
    "status.range": "El campo 'status' debe estar dentro del rango de 0 a 1.",
  };
}

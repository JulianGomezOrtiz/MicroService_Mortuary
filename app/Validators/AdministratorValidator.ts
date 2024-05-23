import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AdministratorValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    // customer_id: schema.number([
    //   rules.exists({ table: "customers", column: "id" }),
    //   rules.unique({
    //     table: "administrators",
    //     column: "user_id",
    //     caseInsensitive: true,
    //     where: {
    //       user_id: this.ctx.request.body()["user_id"],
    //       status: 1,
    //     },
    //   }),
    // ]),

    headquarter_id: schema.number([
      rules.exists({
        table: "headquarters",
        column: "id",
        where: { administaror_id: this.ctx.request.body()["administaror_id"] },
      }),
    ]),
    // mientras el sabado

    responsabilities: schema.string([rules.minLength(5), rules.maxLength(50)]),

    status: schema.number([rules.range(0, 1)]),
  });
  public messages: CustomMessages = {
    "headquarter_id.exists":
      "El ID de la sede proporcionado no existe en la base de datos.",
    "responsabilities.minLength": "El nombre debe tener mínimo 5 caracteres",
    "responsabilities.maxLength": "El nombre debe tener máximo 50 caracteres",
    "status.range": "El campo 'status' debe estar dentro del rango de 0 a 1.",
  };
}

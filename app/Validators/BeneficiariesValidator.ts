import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class BeneficiariesValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    customer_id: schema.number([
      rules.exists({ table: "customers", column: "id" }),
      rules.unique({
        table: "beneficiaries",
        column: "customer_id",
        caseInsensitive: true,
        where: {
          customer_id: this.ctx.request.body()["customer_id"],
        },
      }),
    ]),
    holder_id: schema.number([
      rules.exists({ table: "holders", column: "id" }),
    ]),
    isprincipal_beneficiarie: schema.boolean([
      rules.unique({
        table: "beneficiaries",
        column: "isprincipal_beneficiarie",
        caseInsensitive: true,
        where: {
          holder_id: this.ctx.request.body()["holder_id"],
          isprincipal_beneficiarie: true,
        },
      }),
    ]),
    is_emergy_contact: schema.boolean(),
    status: schema.number([rules.range(0, 1)]),
  });
  public messages: CustomMessages = {
    "customer_id.exists":
      "El ID del cliente proporcionado no existe en la base de datos.",
    "customer_id.unique":
      "El ID del cliente proporcionado ya tiene un beneficiario asociado.",
    "holder_id.exists":
      "El ID del titular proporcionado no existe en la base de datos.",
    "isprincipal_beneficiarie.unique":
      "El beneficiario principal ya está registrado para este titular.",
    "status.range": "El campo 'status' debe estar dentro del rango de 0 a 1.",
  };
}

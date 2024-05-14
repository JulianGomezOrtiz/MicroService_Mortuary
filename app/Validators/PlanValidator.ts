import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class PlanValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string(),
    description: schema.string(),
    number_of_beneficiaries: schema.number([rules.range(1, 10)]),
    price: schema.number([rules.range(100000, 1000000)]),
    discount: schema.number([rules.range(0, 100)]),
  });
  public messages: CustomMessages = {
    "name.required": "El nombre es obligatorio.",
    "description.required": "La descripción es obligatoria.",
    "number_of_beneficiaries.range":
      "El número de beneficiarios debe estar entre 1 y 10.",
    "price.range":
      "El precio del plan debe estar entre los $100.000 y $1.000.000 de pesos colombianos.",
    "discount.range":
      "El descuento no puede ser negativo y no puede ser mayor al 100%.",
  };
}

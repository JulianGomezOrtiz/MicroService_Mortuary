// import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
// import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

// export default class AdministratorValidator {
//   constructor(protected ctx: HttpContextContract) {}
//   public schema = schema.create({

//     responsabilities: schema.string([rules.minLength(5), rules.maxLength(50)]),

//     status: schema.number([rules.range(0, 1)]),
//   });
//   public messages: CustomMessages = {
//     "responsabilities.minLength": "El nombre debe tener mínimo 5 caracteres",
//     "responsabilities.maxLength": "El nombre debe tener máximo 50 caracteres",
//     "status.range": "El campo 'status' debe estar dentro del rango de 0 a 1.",
//   };
// }

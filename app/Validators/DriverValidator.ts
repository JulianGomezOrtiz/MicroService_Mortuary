import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class DriverValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    //faltaría la conexion con user SPRING BOOT

    name: schema.string([rules.minLength(5), rules.maxLength(25)]),
    vehicle: schema.string([rules.minLength(5), rules.maxLength(25)]),
    model: schema.string([rules.minLength(2), rules.maxLength(4)]),
    phone_number: schema.string([rules.minLength(10), rules.maxLength(10)]),
    capacity: schema.number([rules.range(1, 5)]),

    status: schema.number([rules.range(0, 1)]),
  });
  public messages: CustomMessages = {
    "name.minLength": "El nombre debe tener mínimo 5 caracteres",
    "name.maxLength": "El nombre debe tener máximo 25 caracteres",
    "vehicle.minLength": "El vehiculo debe tener mínimo 5 caracteres",
    "vehicle.maxLength": "El vehiculo debe tener máximo 25 caracteres",
    "model.minLength": "El modelo debe tener mínimo 2 caracteres",
    "model.maxLength": "El modelo debe tener máximo 4 caracteres",
    "phone_number.minLength": "El número de telefono debe tener mínimo 10 caracteres",
    "phone_number.maxLength": "El número de telefono debe tener máximo 10 caracteres",
    "capacity.range": "La capacidad debe estar desde 1 a 5",
    "status.range": "El campo 'status' debe estar dentro del rango de 0 a 1.",
  };
}

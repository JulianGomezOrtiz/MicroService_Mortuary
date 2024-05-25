import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Driver from "App/Models/Driver";
// import DriverValidator from "App/Validators/DriverValidator";

export default class DriversController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Driver.findOrFail(params.id);
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Driver.query().paginate(page, perPage);
      } else {
        return await Driver.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = request.body();
    // const body = await request.validate(DriverValidator);
    const theDriver: Driver = await Driver.create(body);
    return theDriver;
  }

  public async update({ params, request }: HttpContextContract) {
    const theDriver: Driver = await Driver.findOrFail(params.id);
    const body = request.body();
    // const body = await request.validate(DriverValidator);

    //queda pendiente cargar el validador de driver, administrator, messages y validar los atributos faltantes
    theDriver.name = body.name;
    theDriver.vehicle = body.vehicle;
    theDriver.model = body.model;
    theDriver.phone_number = body.phone_number;
    theDriver.capacity = body.capacity;
    theDriver.status = body.status;

    return await theDriver.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theDriver: Driver = await Driver.findOrFail(params.id);
    response.status(204);
    return await theDriver.delete();
  }
}

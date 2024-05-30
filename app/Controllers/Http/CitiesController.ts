import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import City from "App/Models/City";
import CityValidator from "App/Validators/CityValidator";

export default class CitiesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const theCity: City = await City.findOrFail(params.id);
      await theCity.load("headquarter");
      await theCity.load("department");
      return theCity;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await City.query()
          .preload("department")
          .preload("headquarter")
          .paginate(page, perPage);
      } else {
        return await City.query().preload("department").preload("headquarter");
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = await request.validate(CityValidator);
    const theCity: City = await City.create(body);
    return theCity;
  }

  public async update({ params, request }: HttpContextContract) {
    const theCity: City = await City.findOrFail(params.id);
    const body = await request.validate(CityValidator);
    theCity.name = body.name;
    theCity.department_id = body.department_id;
    theCity.status = body.status;
    return await theCity.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theCity: City = await City.findOrFail(params.id);
    response.status(204);
    return await theCity.delete();
  }
}

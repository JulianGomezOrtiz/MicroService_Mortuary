import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import City from "App/Models/City";

export default class CitiesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theCity: City = await City.findOrFail(params.id);
      // cargar la relacion
      //await theCity.load("customer");
      return theCity;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await City.query().paginate(page, perPage);
      } else {
        return await City.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theCity: City = await City.create(body);
    return theCity;
  }

  public async update({ params, request }: HttpContextContract) {
    const theCity: City = await City.findOrFail(params.id);
    const body = request.body();
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

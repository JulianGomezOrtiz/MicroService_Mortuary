import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Administrator from "App/Models/Administrator";
import AdministratorValidator from "App/Validators/AdministratorValidator";

export default class AdministratorsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Administrator.findOrFail(params.id);
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Administrator.query().paginate(page, perPage);
      } else {
        return await Administrator.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    // const body = request.body();
    const body = await request.validate(AdministratorValidator);

    const theAdministrator: Administrator = await Administrator.create(body);
    return theAdministrator;
  }

  public async update({ params, request }: HttpContextContract) {
    const theAdministrator: Administrator = await Administrator.findOrFail(
      params.id
    );
    // const body = request.body();
    const body = await request.validate(AdministratorValidator);

    // elimino main office de todo administrator, a causa del diagrama
    theAdministrator.responsabilities = body.responsabilities;
    theAdministrator.status = body.status;
    return await theAdministrator.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theAdministrator: Administrator = await Administrator.findOrFail(
      params.id
    );
    response.status(204);
    return await theAdministrator.delete();
  }
}

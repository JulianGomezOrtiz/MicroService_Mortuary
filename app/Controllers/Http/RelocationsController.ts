import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Relocation from "App/Models/Relocation";
import Ws from "App/Services/Ws";
import RelocationValidator from "App/Validators/RelocationValidator";

export default class RelocationsController {
  public async find({ request, params }: HttpContextContract) {
    Ws.io.emit("news", {
      message: "listaron desde otro lugar las reubicaciones",
    });
    if (params.id) {
      let theRelocation: Relocation = await Relocation.findOrFail(params.id);
      await theRelocation.load("service");
      return theRelocation;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Relocation.query()
          .preload("service")
          .paginate(page, perPage);
      } else {
        return await Relocation.query().preload("service");
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = await request.validate(RelocationValidator);

    const theRelocation: Relocation = await Relocation.create(body);

    return theRelocation;
  }

  public async update({ params, request }: HttpContextContract) {
    const theRelocation: Relocation = await Relocation.findOrFail(params.id);
    const body = await request.validate(RelocationValidator);

    theRelocation.service_id = body.service_id;
    theRelocation.location = body.location;
    theRelocation.status = body.status;

    return await theRelocation.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theRelocation: Relocation = await Relocation.findOrFail(params.id);
    response.status(204);

    return await theRelocation.delete();
  }
}

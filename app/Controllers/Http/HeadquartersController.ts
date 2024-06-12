import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Headquarter from "App/Models/Headquarter";
import Ws from "App/Services/Ws";
import HeadquarterValidator from "App/Validators/HeadquarterValidator";

export default class HeadquartersController {
  public async find({ request, params }: HttpContextContract) {
    Ws.io.emit("news", {
      message: "listaron desde otro lugar las sedes",
    });
    if (params.id) {
      const theHeadquarter: Headquarter = await Headquarter.findOrFail(
        params.id
      );
      await theHeadquarter.load("room");
      await theHeadquarter.load("city");

      return theHeadquarter;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Headquarter.query()
          .preload("administrator")
          .preload("room")
          .preload("city")
          .paginate(page, perPage);
      } else {
        return await Headquarter.query()
          .preload("room")
          .preload("city")
          .preload("administrator");
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = await request.validate(HeadquarterValidator);
    const theHeadquarter: Headquarter = await Headquarter.create(body);
    return theHeadquarter;
  }

  public async update({ params, request }: HttpContextContract) {
    const theHeadquarter: Headquarter = await Headquarter.findOrFail(params.id);
    const body = await request.validate(HeadquarterValidator);
    theHeadquarter.administrator_id = body.administrator_id;
    theHeadquarter.name = body.name;
    theHeadquarter.description = body.description;
    theHeadquarter.capacity = body.capacity;
    theHeadquarter.city_id = body.city_id;
    theHeadquarter.status = body.status;
    return await theHeadquarter.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theHeadquarter: Headquarter = await Headquarter.findOrFail(params.id);
    response.status(204);
    return await theHeadquarter.delete();
  }
}

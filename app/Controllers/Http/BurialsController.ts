import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Burial from "App/Models/Burial";
import Ws from "App/Services/Ws";
import BurialValidator from "App/Validators/BurialValidator";

export default class BurialsController {
  public async find({ request, params }: HttpContextContract) {
    Ws.io.emit("news", {
      message: "listaron desde otro lugar a los entierros",
    });
    if (params.id) {
      let theBurial: Burial = await Burial.findOrFail(params.id);
      await theBurial.load("service");
      await theBurial.load("room");
      return theBurial;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Burial.query()
          .preload("room")
          .preload("service")
          .paginate(page, perPage);
      } else {
        return await Burial.query().preload("room").preload("service");
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = await request.validate(BurialValidator);

    const theBurial: Burial = await Burial.create(body);
    return theBurial;
  }

  public async update({ params, request }: HttpContextContract) {
    const theBurial: Burial = await Burial.findOrFail(params.id);
    const body = await request.validate(BurialValidator);

    theBurial.service_id = body.service_id;
    theBurial.room_id = body.room_id;
    theBurial.description = body.description;
    theBurial.location = body.location;
    theBurial.status = body.status;

    return await theBurial.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theBurial: Burial = await Burial.findOrFail(params.id);
    response.status(204);
    return await theBurial.delete();
  }
}

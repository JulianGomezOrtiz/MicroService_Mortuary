import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Cremation from "App/Models/Cremation";
import Ws from "App/Services/Ws";
import CremationValidator from "App/Validators/CremationValidator";

export default class CremationsController {
  public async find({ request, params }: HttpContextContract) {
    Ws.io.emit("news", {
      message: "listaron desde otro lugar las cremaciones",
    });
    if (params.id) {
      let theCremation: Cremation = await Cremation.findOrFail(params.id);
      await theCremation.load("service");
      await theCremation.load("room");
      return theCremation;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Cremation.query()
          .preload("room")
          .preload("service")
          .paginate(page, perPage);
      } else {
        return await Cremation.query().preload("room").preload("service"); 
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = await request.validate(CremationValidator);
    const theCremation: Cremation = await Cremation.create(body);
    return theCremation;
  }

  public async update({ params, request }: HttpContextContract) {
    const theCremation: Cremation = await Cremation.findOrFail(params.id);
    const body = await request.validate(CremationValidator);

    theCremation.service_id = body.service_id;
    theCremation.room_id = body.room_id;
    theCremation.cremation_date = body.cremation_date;
    theCremation.status = body.status;

    return await theCremation.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theCremation: Cremation = await Cremation.findOrFail(params.id);
    response.status(204);
    return await theCremation.delete();
  }
}

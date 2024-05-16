import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Transmision from "App/Models/Transmision";
import TransmisionValidator from "App/Validators/TransmisionValidator";
import axios from "axios";
import env from "env";

export default class TransmisionsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Transmision.findOrFail(params.id);
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Transmision.query().paginate(page, perPage);
      } else {
        return await Transmision.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(TransmisionValidator);
    //let airport = (await axios.get(`${env.get("MS_SECURITY")}/${body.puntos}`)).data;
    //  body.user_puntos= fidelidad.puntos
    console.log(body);
    const theTransmision: Transmision = await Transmision.create(body);
    return theTransmision;
  }
}

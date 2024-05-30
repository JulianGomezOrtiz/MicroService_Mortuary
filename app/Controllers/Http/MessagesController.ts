import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Message from "App/Models/Message";
import MessageValidator from "App/Validators/MessageValidator";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";

export default class MessagesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Message.findOrFail(params.id);
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Message.query().paginate(page, perPage);
      } else {
        return await Message.query();
      }
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      let theRequest = request.toJSON();
      let token = theRequest.headers.authorization;
      const body = request.body();
      let user;
      try {
        user = (
          await axios.get(
            `${Env.get("MS-SECURITY")}/api/users/${body.user_id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          )
        ).data;
      } catch (error) {
        user = null;
      }
      let conflictUser: Message | null = await Message.query()
        .where("user_id", body.user_id)
        .first();
      if (user && conflictUser == null) {
        const message = await Message.create(body);
        return response
          .status(200)
          .json({ mensaje: "Registro del Mensaje creado", data: message });
      } else {
        return response.status(400).json({
          mensaje: "No se encontro al usuario referenciado",
          data: body,
        });
      }
    } catch (error) {
      return response
        .status(500)
        .json({ mensaje: "Error en la creacion del usuario", data: error });
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const theMessage: Message = await Message.findOrFail(params.id);
    const body = await request.validate(MessageValidator);
    theMessage.chatRoom_id = body.chatRoom_id;
    theMessage.message = body.message;
    theMessage.date = body.date;
    theMessage.status = body.status;

    return await theMessage.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theMessage: Message = await Message.findOrFail(params.id);
    response.status(204);
    return await theMessage.delete();
  }
}

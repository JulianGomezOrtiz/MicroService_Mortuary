import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ChatRoom from "App/Models/ChatRoom";

export default class ChatRoomsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await ChatRoom.findOrFail(params.id);
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await ChatRoom.query().paginate(page, perPage);
      } else {
        return await ChatRoom.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theChatRoom: ChatRoom = await ChatRoom.create(body);
    return theChatRoom;
  }

  public async update({ params, request }: HttpContextContract) {
    const theChatRoom: ChatRoom = await ChatRoom.findOrFail(params.id);
    const body = request.body();
    theChatRoom.id_service = body.id_service;
    theChatRoom.id_titular = body.id_titular;
    theChatRoom.name = body.name;
    theChatRoom.code = body.code;
    theChatRoom.status = body.status;

    return await theChatRoom.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theChatRoom: ChatRoom = await ChatRoom.findOrFail(params.id);
    response.status(204);
    return await theChatRoom.delete();
  }
}

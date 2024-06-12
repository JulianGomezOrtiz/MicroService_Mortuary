import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ChatRoom from "App/Models/ChatRoom";
import Ws from "App/Services/Ws";
import ChatRoomValidator from "App/Validators/ChatRoomValidator";

export default class ChatRoomsController {
  public async find({ request, params }: HttpContextContract) {
    Ws.io.emit("news", {
      message: "listaron desde otro lugar los chatRooms",
    });
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
    // const body = request.body();
    const body = await request.validate(ChatRoomValidator);

    const theChatRoom: ChatRoom = await ChatRoom.create(body);
    return theChatRoom;
  }

  public async update({ params, request }: HttpContextContract) {
    const theChatRoom: ChatRoom = await ChatRoom.findOrFail(params.id);
    // const body = request.body();
    const body = await request.validate(ChatRoomValidator);

    theChatRoom.service_execution_id = body.service_execution_id;
    theChatRoom.holder_id = body.holder_id;
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

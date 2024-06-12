import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Room from "App/Models/Room";
import Ws from "App/Services/Ws";
import RoomValidator from "App/Validators/RoomValidator";

export default class RoomsController {
  public async find({ request, params }: HttpContextContract) {
    Ws.io.emit("news", {
      message: "listaron desde otro lugar las salas",
    });
    if (params.id) {
      const theRoom: Room = await Room.findOrFail(params.id);
      await theRoom.load("headquarter");
      await theRoom.load("burials");
      await theRoom.load("cremations");
      return theRoom;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Room.query()
          .preload("burials")
          .preload("cremations")
          .preload("headquarter")
          .paginate(page, perPage);
      } else {
        return await Room.query()
          .preload("burials")
          .preload("cremations")
          .preload("headquarter");
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = await request.validate(RoomValidator);
    const theRoom: Room = await Room.create(body);
    return theRoom;
  }

  public async update({ params, request }: HttpContextContract) {
    const theRoom: Room = await Room.findOrFail(params.id);
    const body = await request.validate(RoomValidator);
    theRoom.name = body.name;
    theRoom.description = body.description;
    theRoom.capacity = body.capacity;
    theRoom.headquarter_id = body.headquarter_id;
    theRoom.status = body.status;
    return await theRoom.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theRoom: Room = await Room.findOrFail(params.id);
    response.status(204);
    return await theRoom.delete();
  }
}

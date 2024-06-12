import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Holder from "App/Models/Holder";
import Ws from "App/Services/Ws";
import HolderValidator from "App/Validators/HolderValidator";

export default class HoldersController {
  public async find({ request, params, response }: HttpContextContract) {
    Ws.io.emit("news", {
      message: "listaron desde otro lugar los titulares",
    });
    try {
      if (params.id) {
        let theHolder: Holder = await Holder.findOrFail(params.id);
        // cargar la relacion
        await theHolder.load("customer");
        await theHolder.load("beneficiaries");
        return response.status(200).json({
          message: "Registro del titular encontrado",
          data: theHolder,
        });
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input("page", 1);
          const perPage = request.input("per_page", 20);
          const holders = await Holder.query()
            .preload("customer")
            .preload("beneficiaries")
            .paginate(page, perPage);
          return response.status(200).json({
            message: "Registro de los titulares encontrados",
            data: holders,
          });
        } else {
          const holders = await Holder.query()
            .preload("customer")
            .preload("beneficiaries");
          return response.status(200).json({
            message: "Registro de los titulares encontrados",
            data: holders,
          });
        }
      }
    } catch (error) {
      return response.status(500).json({
        message: "Error al obtener los(el) titular(es)",
        error: error.message,
      });
    }
  }
  public async create({ request, response }: HttpContextContract) {
    const body = await request.validate(HolderValidator);
    const theHolder: Holder = await Holder.create(body);
    return response.status(200).json({
      message: "Titular creado exitosament",
      data: theHolder,
    });
  }

  public async update({ params, request, response }: HttpContextContract) {
    const theHolder: Holder = await Holder.findOrFail(params.id);
    const body = await request.validate(HolderValidator);
    theHolder.customer_id = body.customer_id;
    theHolder.status = body.status;
    await theHolder.save();
    return response.status(200).json({
      message: "Titular actualizado correctamente",
      data: theHolder,
    });
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const theHolder: Holder = await Holder.findOrFail(params.id);
      await theHolder.delete();
      return response
        .status(200)
        .json({ message: "titular eliminado correctamente" });
    } catch (error) {
      return response.status(500).json({
        message: "Error al eliminar el titular",
        error: error.message,
      });
    }
  }
}

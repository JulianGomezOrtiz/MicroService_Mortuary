import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Camara from "App/Models/Camara";
import CamaraValidator from "App/Validators/CamaraValidator";

export default class CamarasController {
  public async find({ request, params, response }: HttpContextContract) {
    try {
      if (params.id) {
        let theCamera: Camara = await Camara.findOrFail(params.id);
        await theCamera.load("serviceExecutions");
        return response.status(200).json({
          message: "Camara encontrada",
          data: theCamera,
        });
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input("page", 1);
          const perPage = request.input("per_page", 20);
          const camaras = await Camara.query()
            .preload("serviceExecutions")
            .paginate(page, perPage);
          return response
            .status(200)
            .json({ message: "Camaras encontradas", data: camaras });
        } else {
          const camaras = await Camara.query().preload("serviceExecutions");
          return response.status(200).json({
            message: "Camaras encontradas",
            data: camaras,
          });
        }
      }
    } catch (error) {
      return response.status(500).json({
        message: "Error al obtener las camaras",
        error: error.message,
      });
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const body = await request.validate(CamaraValidator);
    const theCamera: Camara = await Camara.create(body);
    return response.status(201).json({
      message: "Camara creada exitosamente",
      data: theCamera,
    });
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const theCamera: Camara = await Camara.findOrFail(params.id);
      await theCamera.delete();
      return response.status(200).json({
        message: "Camara eliminada correctamente",
      });
    } catch (error) {
      return response.status(500).json({
        message: "Error al eliminar la Camara",
        error: error.message,
      });
    }
  }
}

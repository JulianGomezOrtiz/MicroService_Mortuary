import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Service from "App/Models/Service";
import ServiceValidator from "App/Validators/ServiceValidator";

export default class ServicesController {
  public async find({ request, params, response }: HttpContextContract) {
    try {
      if (params.id) {
        let theService: Service = await Service.findOrFail(params.id);
        await theService.load("customers");
        
        await theService.load("relocations");
        await theService.load("burials");
        await theService.load("cremations");

        return response.status(200).json({
          message: "Registro del servicio encontrado",
          data: theService,
        });
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input("page", 1);
          const perPage = request.input("per_page", 20);
          const services = await Service.query()
            .preload("customers")
            .paginate(page, perPage);
          return response.status(200).json({
            message: "Registro de los servicios encontrados",
            data: services,
          });
        } else {
          const services = await Service.query().preload("customers");
          return response.status(200).json({
            message: "Registro de los servicios encontrados",
            data: services,
          });
        }
      }
    } catch (error) {
      return response.status(500).json({
        message: "Error al obtener los(el) servicio(s)",
        error: error.message,
      });
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const body = await request.validate(ServiceValidator);
    const theService: Service = await Service.create(body);
    return response.status(200).json({
      message: "Servicio creado exitosamente",
      data: theService,
    });
  }

  public async update({ params, request, response }: HttpContextContract) {
    const theService: Service = await Service.findOrFail(params.id);
    const body = await request.validate(ServiceValidator);
    theService.ceremony_id = body.ceremony_id;
    theService.body_ubication = body.body_ubication;
    theService.need_trip = body.need_trip;
    theService.status = body.status;
    await theService.save();
    return response.status(200).json({
      message: "Servicio actualizado correctamente",
      data: theService,
    });
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const theService: Service = await Service.findOrFail(params.id);
      await theService.delete();
      return response.status(200).json({
        message: "Servicio eliminado correctamente",
      });
    } catch (error) {
      return response.status(500).json({
        message: "Error al eliminar el servicio",
        error: error.message,
      });
    }
  }
}

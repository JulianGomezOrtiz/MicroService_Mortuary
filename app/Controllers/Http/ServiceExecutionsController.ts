import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ServiceExecution from "App/Models/ServiceExecution";
import Ws from "App/Services/Ws";
import ServiceExecutionValidator from "App/Validators/ServiceExecutionValidator";

export default class ServiceExecutionsController {
  public async find({ request, params, response }: HttpContextContract) {
    Ws.io.emit("news", {
      message: "listaron desde otro lugar los servicios en ejecución",
    });
    try {
      if (params.id) {
        let serviceExecution: ServiceExecution | null =
          await ServiceExecution.query()
            .where("id", params.id)
            .preload("customer")
            .preload("service")
            .preload("driver")
            .preload("commentAndRatings")
            .first();

        if (serviceExecution != null) {
          return response.status(200).json({
            mensaje: "Registro del servicio en ejecución encontrado",
            data: serviceExecution,
          });
        } else {
          return response.status(404).json({
            mensaje: "No se encontró registro del servicio en ejecución",
            data: serviceExecution,
          });
        }
      } else {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        let serviceExecutions: ServiceExecution[] =
          await ServiceExecution.query()
            .preload("customer")
            .preload("service")
            .preload("driver")
            .preload("commentAndRatings")
            .paginate(page, perPage);

        if (serviceExecutions && serviceExecutions.length > 0) {
          return response.status(200).json({
            mensaje: "Registros de servicios en ejecución encontrados",
            data: serviceExecutions,
          });
        } else {
          return response.status(404).json({
            mensaje: "No se encontraron registros de servicios en ejecución",
            data: serviceExecutions,
          });
        }
      }
    } catch (error) {
      return response.status(500).json({
        mensaje: "Error en la búsqueda de servicios en ejecución",
        error: error.message,
      });
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const body = await request.validate(ServiceExecutionValidator);
    const serviceExecution: ServiceExecution = await ServiceExecution.create(
      body
    );
    return response.status(201).json({
      mensaje: "Servicio en ejecución creado exitosamente",
      data: serviceExecution,
    });
  }

  public async update({ params, request, response }: HttpContextContract) {
    const serviceExecution: ServiceExecution =
      await ServiceExecution.findOrFail(params.id);
    const body = await request.validate(ServiceExecutionValidator);
    serviceExecution.service_id = body.service_id;
    serviceExecution.customer_id = body.customer_id;
    serviceExecution.driver_id = body.driver_id;
    serviceExecution.room_id = body.room_id;
    serviceExecution.main_office = body.main_office;
    serviceExecution.location = body.location;
    serviceExecution.status = body.status;
    await serviceExecution.save();
    return response.status(200).json({
      mensaje: "Servicio en ejecución actualizado correctamente",
      data: serviceExecution,
    });
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const serviceExecution: ServiceExecution =
        await ServiceExecution.findOrFail(params.id);
      await serviceExecution.delete();
      return response.status(200).json({
        mensaje: "Servicio en ejecución eliminado correctamente",
      });
    } catch (error) {
      return response.status(500).json({
        mensaje: "Error al eliminar el servicio en ejecución",
        error: error.message,
      });
    }
  }
}

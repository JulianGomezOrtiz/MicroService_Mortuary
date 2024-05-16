import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Transmision from "App/Models/Transmision";
import TransmisionValidator from "App/Validators/TransmisionValidator";
import Env from "@ioc:Adonis/Core/Env";
import axios from "axios";
import ServiceExecution from "App/Models/ServiceExecution";

export default class TransmisionsController {
  public async find({ request, params, response }: HttpContextContract) {
    try {
      if (params.id) {
        let theTransmision: Transmision = await Transmision.findOrFail(
          params.id
        );
        await theTransmision.load("camara");
        await theTransmision.load("serviceExecutions");
        return response.status(200).json({
          message: "Transmisión encontrada",
          data: theTransmision,
        });
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input("page", 1);
          const perPage = request.input("per_page", 20);
          const transmisions = await Transmision.query()
            .preload("serviceExecutions")
            .paginate(page, perPage);
          return response
            .status(200)
            .json({ message: "Transmisiones encontradas", data: transmisions });
        } else {
          const transmisions = await Transmision.query()
            .preload("serviceExecutions")
            .preload("camara");
          return response.status(200).json({
            message: " Transmisiones encontradas",
            data: transmisions,
          });
        }
      }
    } catch (error) {
      return response.status(500).json({
        message: "Error al obtener las transmisiones",
        error: error.message,
      });
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const body = await request.validate(TransmisionValidator);

      const serviceExecutionId = body.service_execution_id;

      const serviceExecution = await ServiceExecution.query()
        .where("id", serviceExecutionId)
        .preload("customer")
        .firstOrFail();

      const customer = serviceExecution.customer;

      const userId = customer.user_id;

      const userFidelityResponse = await axios.get(
        `${Env.get("MS-SECURITY")}/api/fidelidades/${userId}`
      );
      const userFidelity = userFidelityResponse.data;

      if (userFidelity.puntos < 10) {
        return response.status(400).json({
          message:
            "El usuario asociado no tiene suficientes puntos de fidelidad (mínimo 10 puntos requeridos)",
          data: null,
        });
      } else {
        const theTransmision: Transmision = await Transmision.create(body);
        const newFidelityPoints = userFidelity.puntos - 10;
        await axios.patch(
          `${Env.get("MS-SECURITY")}/api/fidelidades/${userId}`,
          { puntos: newFidelityPoints }
        );
        return response.status(201).json({
          message: "Transmisión creada exitosamente",
          data: theTransmision,
        });
      }
    } catch (error) {
      return response.status(500).json({
        message: "Error al crear la transmisión",
        error: error.message,
      });
    }
  }
  public async delete({ params, response }: HttpContextContract) {
    try {
      const theTransmision: Transmision = await Transmision.findOrFail(
        params.id
      );
      await theTransmision.delete();
      return response.status(200).json({
        message: "Transmisión eliminada correctamente",
      });
    } catch (error) {
      return response.status(500).json({
        message: "Error al eliminar la Transmisión",
        error: error.message,
      });
    }
  }
}

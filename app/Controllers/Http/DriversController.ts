import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Driver from "App/Models/Driver";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";
import DriverValidator from "App/Validators/DriverValidator";
import Ws from "App/Services/Ws";

export default class DriversController {
  public async find({ request, response }: HttpContextContract) {
    Ws.io.emit("news", {
      message: "listaron desde otro lugar los conductores",
    });
    try {
      const page = request.input("page", 1);
      const perPage = request.input("per_page", 20);
      let drivers: Driver[] = await Driver.query()
        .preload("serviceExecutions")
        .paginate(page, perPage);
      let theRequest = request.toJSON();
      let token = theRequest.headers.authorization;
      if (drivers && drivers.length > 0) {
        await Promise.all(
          drivers.map(async (driver) => {
            try {
              let userResponse = await axios.get(
                `${Env.get("MS-SECURITY")}/api/users/${driver.user_id}`,
                {
                  headers: {
                    Authorization: token,
                  },
                }
              );
              driver.user = userResponse.data;
            } catch (error) {
              driver.user = null;
            }
          })
        );
        return response.status(200).json({
          mensaje: "Registros de conductores encontrados",
          data: drivers,
        });
      } else {
        return response.status(404).json({
          mensaje: "No se encontraron registros de conductores",
          data: drivers,
        });
      }
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ mensaje: "Error en la busqueda de clientes", data: error });
    }
  }

  public async findOne({ params, request, response }: HttpContextContract) {
    try {
      let driver: Driver | null = await Driver.query()
        .where("id", params.id)
        .preload("serviceExecutions")
        .first();
      let theRequest = request.toJSON();
      let token = theRequest.headers.authorization;
      if (driver != null) {
        try {
          let userResponse = await axios.get(
            `${Env.get("MS-SECURITY")}/api/users/${driver.user_id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          driver.user = userResponse.data;
        } catch (error) {
          driver.user = null;
        }
        return response
          .status(200)
          .json({ mensaje: "Registro del conductor encontrado", data: driver });
      } else {
        return response.status(404).json({
          mensaje: "No se encontro registro del conductor",
          data: driver,
        });
      }
    } catch (error) {
      return response
        .status(500)
        .json({ mensaje: "Error en la busqueda del conductor", data: error });
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
      let conflictDriver: Driver | null = await Driver.query()
        .where("user_id", body.user_id)
        .first();
      if (user && conflictDriver == null) {
        const driver = await Driver.create(body);
        return response
          .status(200)
          .json({ mensaje: "Registro del conductor creado", data: driver });
      } else if (conflictDriver != null) {
        return response.status(409).json({
          mensaje: "Ya existe un conductor asociado al usuario referenciado",
          data: body,
        });
      } else {
        return response.status(400).json({
          mensaje: "No se encontro al usuario referenciado",
          data: body,
        });
      }
    } catch (error) {
      return response
        .status(500)
        .json({ mensaje: "Error en la creacion del conductor", data: error });
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const driver: Driver = await Driver.findOrFail(params.id);
    const body = await request.validate(DriverValidator);
    driver.vehicle = body.vehicle;
    driver.model = body.model;
    driver.capacity = body.capacity;
    driver.status = body.status;
    await driver.save();
    return response.status(200).json({
      mensaje: "Conductor actualizado correctamente",
      data: driver,
    });
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const driver: Driver = await Driver.findOrFail(params.id);
      if (driver) {
        driver.delete();
        return response
          .status(200)
          .json({ mensaje: "Conducto eliminado", data: driver });
      } else {
        return response.status(400).json({
          mensaje: "No se encuentra el conductor a eliminar",
          data: driver,
        });
      }
    } catch (error) {
      return response.status(500).json({
        mensaje: "Error en la eliminacion del conductor",
        data: error,
      });
    }
  }
}

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Administrator from "App/Models/Administrator";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";
import AdministratorValidator from "App/Validators/AdministratorValidator";
import Ws from "App/Services/Ws";

export default class AdministratorsController {
  public async find({ request, response }: HttpContextContract) {
    Ws.io.emit("news", {
      message: "listaron desde otro lugar a administradores",
    });
    // Ws.io.emit('mensajes-'+//paraquien?:Usuario B,{message: 'listaron desde otro lugar a administradores'})
    //para enviar el mensaje de a para el usuario b
    try {
      const page = request.input("page", 1);
      const perPage = request.input("per_page", 20);
      let administrators: Administrator[] = await Administrator.query()
        // .preload("headquarter")
        .paginate(page, perPage);
      let theRequest = request.toJSON();
      let token = theRequest.headers.authorization;
      if (administrators && administrators.length > 0) {
        await Promise.all(
          administrators.map(async (administrator) => {
            try {
              let userResponse = await axios.get(
                `${Env.get("MS-SECURITY")}/api/users/${administrator.user_id}`,
                {
                  headers: {
                    Authorization: token,
                  },
                }
              );
              administrator.user = userResponse.data;
            } catch (error) {
              administrator.user = null;
            }
          })
        );
        return response.status(200).json({
          mensaje: "Registros de administradores encontrados",
          data: administrators,
        });
      } else {
        return response.status(404).json({
          mensaje: "No se encontraron registros de administradores",
          data: administrators,
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
      let administrator: Administrator | null = await Administrator.query()
        .where("id", params.id)
        // .preload("headquarter")
        .preload("user")
        .first();
      let theRequest = request.toJSON();
      let token = theRequest.headers.authorization;
      if (administrator != null) {
        try {
          let userResponse = await axios.get(
            `${Env.get("MS-SECURITY")}/api/users/${administrator.user_id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          administrator.user = userResponse.data;
        } catch (error) {
          administrator.user = null;
        }
        return response.status(200).json({
          mensaje: "Registro del administrador encontrado",
          data: administrator,
        });
      } else {
        return response.status(404).json({
          mensaje: "No se encontro registro del administrador",
          data: administrator,
        });
      }
    } catch (error) {
      return response.status(500).json({
        mensaje: "Error en la busqueda del administrador",
        data: error,
      });
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
      let conflictAdministrator: Administrator | null =
        await Administrator.query().where("user_id", body.user_id).first();
      if (user && conflictAdministrator == null) {
        const administrator = await Administrator.create(body);
        return response.status(200).json({
          mensaje: "Registro del administrador creado",
          data: administrator,
        });
      } else if (conflictAdministrator != null) {
        return response.status(409).json({
          mensaje:
            "Ya existe un administrador asociado al usuario referenciado",
          data: body,
        });
      } else {
        return response.status(400).json({
          mensaje: "No se encontro al usuario referenciado",
          data: body,
        });
      }
    } catch (error) {
      return response.status(500).json({
        mensaje: "Error en la creacion del administrador",
        data: error,
      });
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const theAdministrator: Administrator = await Administrator.findOrFail(
      params.id
    );
    const body = await request.validate(AdministratorValidator);
    theAdministrator.responsabilities = body.responsabilities;
    theAdministrator.status = body.status;
    await theAdministrator.save();
    return response.status(200).json({
      mensaje: "Conductor actualizado correctamente",
      data: theAdministrator,
    });
  }

  public async delete({ params, response }: HttpContextContract) {
    const theAdministrator: Administrator = await Administrator.findOrFail(
      params.id
    );
    response.status(204);
    return await theAdministrator.delete();
  }
}

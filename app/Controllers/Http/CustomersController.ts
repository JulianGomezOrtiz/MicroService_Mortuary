import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Customer from "App/Models/Customer";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";

export default class CustomersController {
  public async find({ request, response }: HttpContextContract) {
    try {
      const page = request.input("page", 1);
      const perPage = request.input("per_page", 20);
      let customers: Customer[] = await Customer.query()
        .preload("beneficiaries")
        .preload("holders")
        .preload("services")
        .preload("plans")
        .paginate(page, perPage);
      let theRequest = request.toJSON();
      let token = theRequest.headers.authorization;
      if (customers && customers.length > 0) {
        await Promise.all(
          customers.map(async (customer) => {
            try {
              let userResponse = await axios.get(
                `${Env.get("MS-SECURITY")}/api/users/${customer.user_id}`,
                {
                  headers: {
                    Authorization: token,
                  },
                }
              );
              customer.user = userResponse.data;
            } catch (error) {
              customer.user = null;
            }
          })
        );
        return response.status(200).json({
          mensaje: "Registros de clientes encontrados",
          data: customers,
        });
      } else {
        return response.status(404).json({
          mensaje: "No se encontraron registros de clientes",
          data: customers,
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
      let customer: Customer | null = await Customer.query()
        .where("id", params.id)
        .preload("beneficiaries")
        .preload("holders")
        .preload("services")
        .preload("plans")
        .first();
      let theRequest = request.toJSON();
      let token = theRequest.headers.authorization;
      if (customer != null) {
        try {
          let userResponse = await axios.get(
            `${Env.get("MS-SECURITY")}/api/users/${customer.user_id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          customer.user = userResponse.data;
        } catch (error) {
          customer.user = null;
        }
        return response
          .status(200)
          .json({ mensaje: "Registro del cliente encontrado", data: customer });
      } else {
        return response.status(404).json({
          mensaje: "No se encontro registro del cliente",
          data: customer,
        });
      }
    } catch (error) {
      return response
        .status(500)
        .json({ mensaje: "Error en la busqueda del cliente", data: error });
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
      let conflictCustomer: Customer | null = await Customer.query()
        .where("user_id", body.user_id)
        .first();
      if (user && conflictCustomer == null) {
        const customer = await Customer.create(body);
        return response
          .status(200)
          .json({ mensaje: "Registro del cliente creado", data: customer });
      } else if (conflictCustomer != null) {
        return response.status(409).json({
          mensaje: "Ya existe un cliente asociado al usuario referenciado",
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
        .json({ mensaje: "Error en la creacion del cliente", data: error });
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const customerId = params.id;
      const newCustomerData = request.body();

      // Verificar si el cliente existe
      const theCustomer = await Customer.find(customerId);
      if (!theCustomer) {
        return response.status(404).json({
          mensaje: "Cliente no encontrado",
          data: null,
        });
      }

      theCustomer.status = newCustomerData.status;

      let theRequest = request.toJSON();
      let token = theRequest.headers.authorization;
      let userResponse;
      try {
        userResponse = await axios.get(
          `${Env.get("MS-SECURITY")}/api/users/${newCustomerData.user_id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
      } catch (error) {
        userResponse = null;
      }

      if (userResponse !== null) {
        let conflictCustomer: Customer | null = await Customer.query()
          .where("user_id", newCustomerData.user_id)
          .first();

        if (
          conflictCustomer == null ||
          conflictCustomer.id === theCustomer.id
        ) {
          theCustomer.user_id = newCustomerData.user_id;
          try {
            theCustomer.user = userResponse.data.data;
          } catch (error) {
            theCustomer.user = null;
          }
          await theCustomer.save();
          return response
            .status(200)
            .json({ mensaje: "cliente actualizado", data: theCustomer });
        } else {
          return response.status(400).json({
            mensaje: "Ya existe un cliente asociado al usuario referenciado",
            data: theCustomer,
          });
        }
      } else {
        return response.status(400).json({
          mensaje: "No se encontró el usuario referenciado",
          data: theCustomer,
        });
      }
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        mensaje: "Error en la actualización del cliente",
        data: error,
      });
    }
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const customer: Customer = await Customer.findOrFail(params.id);
      if (customer) {
        customer.delete();
        return response
          .status(200)
          .json({ mensaje: "Cliente eliminado", data: customer });
      } else {
        return response.status(400).json({
          mensaje: "No se encuentra el cliente a eliminar",
          data: customer,
        });
      }
    } catch (error) {
      return response
        .status(500)
        .json({ mensaje: "Error en la eliminacion del cliente", data: error });
    }
  }
}

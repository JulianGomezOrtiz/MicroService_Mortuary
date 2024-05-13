import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Membership from "App/Models/Membership";
import MemebershipValidator from "App/Validators/MemebershipValidator";

export default class MembershipsController {
  public async find({ request, params, response }: HttpContextContract) {
    try {
      if (params.id) {
        let theMembership: Membership = await Membership.findOrFail(params.id);
        await theMembership.load("customer");
        await theMembership.load("plan");
        return response.status(200).json({
          message: "Registro de membresia encontrado",
          data: theMembership,
        });
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input("page", 1);
          const perPage = request.input("per_page", 20);
          const memberships = await Membership.query()
            .preload("customer")
            .preload("plan")
            .paginate(page, perPage);
          return response.status(200).json({
            message: "Registro de las membresias encontradas",
            data: memberships,
          });
        } else {
          const memberships = await Membership.query()
            .preload("customer")
            .preload("plan");
          return response.status(200).json({
            message: "Registro de las membresias encontradas",
            data: memberships,
          });
        }
      }
    } catch (error) {
      return response.status(500).json({
        message: "Error al obtener la(s) membresia(s)",
        error: error.message,
      });
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const body = await request.validate(MemebershipValidator);
    const theMembership: Membership = await Membership.create(body);
    return response.status(200).json({
      message: "Membresia creada exitosamente",
      data: theMembership,
    });
  }

  public async update({ params, request, response }: HttpContextContract) {
    const theMembership: Membership = await Membership.findOrFail(params.id);
    const body = await request.validate(MemebershipValidator);
    theMembership.name = body.name;
    theMembership.plan_id = body.plan_id;
    theMembership.customer_id = body.customer_id;
    theMembership.date = body.date;
    theMembership.status = body.status;
    await theMembership.save();
    return response.status(200).json({
      message: "Membresia actualizada correctamente",
    });
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const theMembership: Membership = await Membership.findOrFail(params.id);
      await theMembership.delete();
      return response
        .status(200)
        .json({ message: "Membresia eliminada correctamente" });
    } catch (error) {
      return response.status(500).json({
        message: "Error al eliminar la membresia",
        error: error.message,
      });
    }
  }
}

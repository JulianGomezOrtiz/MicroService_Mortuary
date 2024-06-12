import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Plan from "App/Models/Plan";
import Ws from "App/Services/Ws";
import PlanValidator from "App/Validators/PlanValidator";

export default class PlansController {
  public async find({ request, params, response }: HttpContextContract) {
    Ws.io.emit("news", {
      message: "listaron desde otro lugar los planes",
    });
    try {
      if (params.id) {
        let theplan: Plan = await Plan.findOrFail(params.id);
        await theplan.load("customers");
        return response.status(200).json({
          message: "Plan encontrado",
          data: theplan,
        });
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input("page", 1);
          const perPage = request.input("per_page", 20);
          const plans = await Plan.query()
            .preload("customers")
            .paginate(page, perPage);
          return response
            .status(200)
            .json({ message: "Planes encontrados", data: plans });
        } else {
          const plans = await Plan.query().preload("customers");
          return response.status(200).json({
            message: "Planes encontrados",
            data: plans,
          });
        }
      }
    } catch (error) {
      return response.status(500).json({
        message: "Error al obtener los planes",
        error: error.message,
      });
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const body = await request.validate(PlanValidator);
    const thePlan: Plan = await Plan.create(body);
    return response.status(201).json({
      message: "Plan creado exitosamente",
      data: thePlan,
    });
  }

  public async update({ params, request, response }: HttpContextContract) {
    const thePlan: Plan = await Plan.findOrFail(params.id);
    const body = await request.validate(PlanValidator);
    thePlan.name = body.name;
    thePlan.description = body.description;
    thePlan.number_of_beneficiaries = body.number_of_beneficiaries;
    thePlan.price = body.price;
    thePlan.discount = body.discount;
    await thePlan.save();
    return response.status(200).json({
      message: "Plan actualizado correctamente",
      data: thePlan,
    });
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const thePlan: Plan = await Plan.findOrFail(params.id);
      await thePlan.delete();
      return response.status(200).json({
        message: "Plan eliminado correctamente",
      });
    } catch (error) {
      return response.status(500).json({
        message: "Error al eliminar el plan",
        error: error.message,
      });
    }
  }
}

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import PlanByService from "App/Models/PlanByService";
import Ws from "App/Services/Ws";
import PlanbyserviceValidator from "App/Validators/PlanbyserviceValidator";

export default class PlanByServicesController {
  public async find({ request, params }: HttpContextContract) {
    Ws.io.emit("news", {
      message: "listaron desde otro lugar los planes por servicio",
    });
    if (params.id) {
      const thePlanByService: PlanByService = await PlanByService.findOrFail(
        params.id
      );
      await thePlanByService.load("service");
      await thePlanByService.load("plan");
      return thePlanByService;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await PlanByService.query()
          .preload("plan")
          .preload("service")
          .paginate(page, perPage);
      } else {
        return await PlanByService.query().preload("plan").preload("service");
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = await request.validate(PlanbyserviceValidator);
    const thePlanByService: PlanByService = await PlanByService.create(body);
    return thePlanByService;
  }

  public async update({ params, request }: HttpContextContract) {
    const thePlanByService: PlanByService = await PlanByService.findOrFail(
      params.id
    );
    const body = await request.validate(PlanbyserviceValidator);
    thePlanByService.plan_id = body.plan_id;
    thePlanByService.service_id = body.service_id;
    return await thePlanByService.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const thePlanByService: PlanByService = await PlanByService.findOrFail(
      params.id
    );
    response.status(204);
    return await thePlanByService.delete();
  }
}

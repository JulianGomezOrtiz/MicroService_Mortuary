import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Membership from "App/Models/Membership";

export default class MembershipsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Membership.findOrFail(params.id);
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Membership.query().paginate(page, perPage);
      } else {
        return await Membership.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theMembership: Membership = await Membership.create(body);
    return theMembership;
  }

  public async update({ params, request }: HttpContextContract) {
    const theMembership: Membership = await Membership.findOrFail(params.id);
    const body = request.body();
    theMembership.name = body.name;
    theMembership.plan_id = body.plan_id;
    theMembership.customer_id = body.customer_id;
    theMembership.date = body.date;
    theMembership.status = body.status;

    return await theMembership.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theMembership: Membership = await Membership.findOrFail(params.id);
    response.status(204);
    return await theMembership.delete();
  }
}

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Customer from "App/Models/Customer";

export default class CustomersController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Customer.findOrFail(params.id);
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Customer.query().paginate(page, perPage);
      } else {
        return await Customer.query();
      }
    }
  }
  
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theCustomer: Customer = await Customer.create(body);
    return theCustomer;
  }

  public async update({ params, request }: HttpContextContract) {
    const theCustomer: Customer = await Customer.findOrFail(params.id);
    const body = request.body();
    theCustomer.plan_id = body.plan_id;
    theCustomer.status = body.status;

    return await theCustomer.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theCustomer: Customer = await Customer.findOrFail(params.id);
    response.status(204);
    return await theCustomer.delete();
  }
}

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Bill from "App/Models/Bill";
import Ws from "App/Services/Ws";
import BillValidator from "App/Validators/BillValidator";

export default class BillController {
  public async find({ request, params }: HttpContextContract) {
    Ws.io.emit("news", {
      message: "listaron desde otro lugar los pagos",
    });
    if (params.id) {
      const theBill: Bill = await Bill.query()
        .where("id", params.id)
        .preload("membership", (membershipQuery) => {
          membershipQuery.preload("customer");
        })
        .firstOrFail();
      const customer = theBill.membership.customer;
      return {
        bill: theBill,
        customer: customer,
      };
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Bill.query().preload("membership").paginate(page, perPage);
      } else {
        return await Bill.query().preload("membership")
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(BillValidator);
    const theBill: Bill = await Bill.create(body);
    return theBill;
  }

  public async update({ params, request }: HttpContextContract) {
    const theBill: Bill = await Bill.findOrFail(params.id);
    const body = await request.validate(BillValidator);
    theBill.customer_id = body.customer_id;
    theBill.membership_id = body.membership_id;
    theBill.payment_method_id = body.payment_method_id;
    theBill.price = body.price;
    return await theBill.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theBill: Bill = await Bill.findOrFail(params.id);
    response.status(204);
    return await theBill.delete();
  }
}

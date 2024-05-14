import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bills from "App/Models/Bill";
import BillValidator from 'App/Validators/BillValidator';

export default class BillsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            return await Bills.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Bills.query().paginate(page, perPage)
            } else {
                return await Bills.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
    const body = await request.validate(BillValidator);
        const theBills: Bills = await Bills.create(body);
        return theBills;
    }

    public async update({ params, request }: HttpContextContract) {
        const theBills: Bills = await Bills.findOrFail(params.id);
    const body = await request.validate(BillValidator);
        theBills.payment_method_id = body.payment_method_id;
        return await theBills.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theBills: Bills = await Bills.findOrFail(params.id);
        response.status(204);
        return await theBills.delete();
    }
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Beneficiarie from 'App/Models/Beneficiarie';

export default class BeneficiariesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theBeneficiarie:Beneficiarie = await Beneficiarie.findOrFail(params.id);
            // cargar la relacion
            //await theBeneficiarie.load("customer");
            return theBeneficiarie;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Beneficiarie.query().paginate(page, perPage)
            } else {
                return await Beneficiarie.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theBeneficiarie: Beneficiarie = await Beneficiarie.create(body);
        return theBeneficiarie;
    }

    public async update({ params, request }: HttpContextContract) {
        const theBeneficiarie: Beneficiarie = await Beneficiarie.findOrFail(params.id);
        const body = request.body();
        theBeneficiarie.customer_id = body.customer_id;
        theBeneficiarie.holder_id = body.holder_id;
        theBeneficiarie.isprincipal_beneficiarie = body.isprincipal_beneficiarie;
        theBeneficiarie.isEmergyContact = body.isEmergyContact;
        theBeneficiarie.status = body.status;
        return await theBeneficiarie.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theBeneficiarie: Beneficiarie = await Beneficiarie.findOrFail(params.id);
        response.status(204);
        return await theBeneficiarie.delete();
    }
}

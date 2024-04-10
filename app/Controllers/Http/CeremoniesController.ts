import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ceremony from 'App/Models/Ceremony';

export default class CeremoniesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCeremony:Ceremony = await Ceremony.findOrFail(params.id);
            // cargar la relacion
            //await theCeremony.load("customer");
            return theCeremony;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Ceremony.query().paginate(page, perPage)
            } else {
                return await Ceremony.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theCeremony: Ceremony = await Ceremony.create(body);
        return theCeremony;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCeremony: Ceremony = await Ceremony.findOrFail(params.id);
        const body = request.body();
        theCeremony.type_of_ceremony = body.type_of_ceremony;
        theCeremony.location = body.location;
        theCeremony.status = body.status;
        return await theCeremony.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCeremony: Ceremony = await Ceremony.findOrFail(params.id);
        response.status(204);
        return await theCeremony.delete();
    } 
}

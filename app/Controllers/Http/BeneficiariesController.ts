import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Beneficiarie from "App/Models/Beneficiarie";
import BeneficiariesValidator from "App/Validators/BeneficiariesValidator";

export default class BeneficiariesController {
  public async find({ request, params, response }: HttpContextContract) {
    try {
      if (params.id) {
        let theBeneficiarie: Beneficiarie = await Beneficiarie.findOrFail(
          params.id
        );
        await theBeneficiarie.load("customer");
        await theBeneficiarie.load("holder");
        return response.status(200).json({
          message: "Registro del beneficiario encontrado",
          data: theBeneficiarie,
        });
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input("page", 1);
          const perPage = request.input("per_page", 20);
          const beneficiaries = await Beneficiarie.query()
            .preload("customer")
            .preload("holder")
            .paginate(page, perPage);
          return response.status(200).json({
            message: "Registro de los beneficiarios encontrados",
            data: beneficiaries,
          });
        } else {
          const beneficiaries = await Beneficiarie.query()
            .preload("customer")
            .preload("holder");
          return response.status(200).json({
            message: "Registro de los beneficiarios encontrados",
            data: beneficiaries,
          });
        }
      }
    } catch (error) {
      return response.status(500).json({
        message: "Error al obtener los(el) beneficiario(s)",
        error: error.message,
      });
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const body = await request.validate(BeneficiariesValidator);
    const theBeneficiarie: Beneficiarie = await Beneficiarie.create(body);
    return response.status(200).json({
      message: "Beneficiario creado exitosamente",
      data: theBeneficiarie,
    });
  }

  public async update({ params, request, response }: HttpContextContract) {
    const theBeneficiarie: Beneficiarie = await Beneficiarie.findOrFail(
      params.id
    );
    const body = await request.validate(BeneficiariesValidator);
    theBeneficiarie.customer_id = body.customer_id;
    theBeneficiarie.holder_id = body.holder_id;
    theBeneficiarie.isprincipal_beneficiarie = body.isprincipal_beneficiarie;
    theBeneficiarie.is_emergy_contact = body.is_emergy_contact;
    theBeneficiarie.status = body.status;
    await theBeneficiarie.save();
    return response.status(200).json({
      message: "Beneficiario actualizado correctamente",
      data: theBeneficiarie,
    });
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const theBeneficiarie: Beneficiarie = await Beneficiarie.findOrFail(
        params.id
      );
      await theBeneficiarie.delete();
      return response.status(200).json({
        message: "Beneficiario eliminado correctamente",
      });
    } catch (error) {
      return response.status(500).json({
        message: "Error al eliminar el beneficiario",
        error: error.message,
      });
    }
  }
}

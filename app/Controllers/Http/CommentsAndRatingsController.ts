import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CommentAndRating from "App/Models/CommentAndRating";
import Ws from "App/Services/Ws";
import CommentAndRatingValidator from "App/Validators/CommentAndRating";

export default class CommentsAndRatingsController {
  public async find({ request, params }: HttpContextContract) {
    Ws.io.emit("news", {
      message: "listaron desde otro lugar los comentarios y calificaciones",
    });
    if (params.id) {
      return await CommentAndRating.findOrFail(params.id);
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await CommentAndRating.query().paginate(page, perPage);
      } else {
        return await CommentAndRating.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    // const body = request.body();
    const body = await request.validate(CommentAndRatingValidator);

    const theCommentAndRating: CommentAndRating = await CommentAndRating.create(
      body
    );
    return theCommentAndRating;
  }

  public async update({ params, request }: HttpContextContract) {
    const theCommentAndRating: CommentAndRating =
      await CommentAndRating.findOrFail(params.id);
    // const body = request.body();
    const body = await request.validate(CommentAndRatingValidator);

    theCommentAndRating.service_execution_id = body.service_execution_id;
    theCommentAndRating.customer_id = body.customer_id;
    theCommentAndRating.description = body.description;
    theCommentAndRating.rating = body.rating;

    return await theCommentAndRating.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theCommentAndRating: CommentAndRating =
      await CommentAndRating.findOrFail(params.id);
    response.status(204);
    return await theCommentAndRating.delete();
  }
}

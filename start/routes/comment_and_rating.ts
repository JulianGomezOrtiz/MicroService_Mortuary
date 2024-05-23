import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/CommentsAndRatings", "CommentsAndRatingsController.find");
  Route.post("/CommentsAndRatings", "CommentsAndRatingsController.create");
  Route.get("/CommentsAndRatings/:id", "CommentsAndRatingsController.find");
  Route.put("/CommentsAndRatings/:id", "CommentsAndRatingsController.update");
  Route.delete("/CommentsAndRatings/:id", "CommentsAndRatingsController.delete");
}); 

import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/Cremations", "CremationsController.find");
  Route.post("/Cremations", "CremationsController.create");
  Route.get("/Cremations/:id", "CremationsController.find");
  Route.put("/Cremations/:id", "CremationsController.update");
  Route.delete("/Cremations/:id", "CremationsController.delete");
}); 

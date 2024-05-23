import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/Cities", "CitiesController.find");
  Route.post("/Cities", "CitiesController.create");
  Route.get("/Cities/:id", "CitiesController.find");
  Route.put("/Cities/:id", "CitiesController.update");
  Route.delete("/Cities/:id", "CitiesController.delete");
}); 

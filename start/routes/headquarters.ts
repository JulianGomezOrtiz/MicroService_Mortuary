import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/Headquarters", "HeadquartersController.find");
  Route.post("/Headquarters", "HeadquartersController.create");
  Route.get("/Headquarters/:id", "HeadquartersController.find");
  Route.put("/Headquarters/:id", "HeadquartersController.update");
  Route.delete("/Headquarters/:id", "HeadquartersController.delete");
}); 

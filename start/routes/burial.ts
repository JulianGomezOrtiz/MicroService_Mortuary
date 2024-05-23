import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/Burials", "BurialsController.find");
  Route.post("/Burials", "BurialsController.create");
  Route.get("/Burials/:id", "BurialsController.find");
  Route.put("/Burials/:id", "BurialsController.update");
  Route.delete("/Burials/:id", "BurialsController.delete");
}); 

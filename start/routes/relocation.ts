import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/Relocations", "RelocationsController.find");
  Route.post("/Relocations", "RelocationsController.create");
  Route.get("/Relocations/:id", "RelocationsController.find");
  Route.put("/Relocations/:id", "RelocationsController.update");
  Route.delete("/Relocations/:id", "RelocationsController.delete");
}); 

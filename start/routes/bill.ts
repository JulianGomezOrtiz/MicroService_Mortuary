import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/Bills", "BillsController.find");
  Route.post("/Bills", "BillsController.create");
  Route.get("/Bills/:id", "BillsController.find");
  Route.put("/Bills/:id", "BillsController.update");
  Route.delete("/Bills/:id", "BillsController.delete");
}); 

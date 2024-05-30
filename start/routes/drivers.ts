import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/Drivers", "DriversController.find");
  Route.post("/Drivers", "DriversController.create");
  Route.get("/Drivers/:id", "DriversController.findOne");
  Route.put("/Drivers/:id", "DriversController.update");
  Route.delete("/Drivers/:id", "DriversController.delete");
}); 

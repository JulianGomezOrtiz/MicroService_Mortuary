import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/PlanByService", "PlanByServicesController.find");
  Route.post("/PlanByService", "PlanByServicesController.create");
  Route.get("/PlanByService/:id", "PlanByServicesController.find");
  Route.put("/PlanByService/:id", "PlanByServicesController.update");
  Route.delete("/PlanByService/:id", "PlanByServicesController.delete");
}); 

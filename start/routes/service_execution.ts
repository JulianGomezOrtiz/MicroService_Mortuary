import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/ServiceExecutions", "ServiceExecutionsController.find");
  Route.post("/ServiceExecutions", "ServiceExecutionsController.create");
  Route.get("/ServiceExecutions/:id", "ServiceExecutionsController.find");
  Route.put("/ServiceExecutions/:id", "ServiceExecutionsController.update");
  Route.delete("/ServiceExecutions/:id", "ServiceExecutionsController.delete");
}); //.middleware(["security"])

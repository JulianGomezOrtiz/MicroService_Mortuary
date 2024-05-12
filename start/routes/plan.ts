import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/Plans", "PlansController.find");
  Route.post("/Plans", "PlansController.create");
  Route.get("/Plans/:id", "PlansController.find");
  Route.put("/Plans/:id", "PlansController.update");
  Route.delete("/Plans/:id", "PlansController.delete");
}); //.middleware(["security"])
